-- Revelo: álbumes de fotos privados con enlace público de solo lectura.
-- Ejecutar en el SQL Editor de Supabase (Dashboard > SQL Editor).

-- ============================================================
-- Extensiones
-- ============================================================

create extension if not exists pgcrypto with schema extensions;

-- Schema privado para funciones security definer (no expuesto vía API).
create schema if not exists private;

-- ============================================================
-- Tabla: albums
-- ============================================================

create table public.albums (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Álbum sin título',
  description text,
  share_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index albums_user_id_idx on public.albums (user_id);
create unique index albums_share_token_idx on public.albums (share_token);

comment on table public.albums is 'Álbumes de fotos de un usuario. share_token identifica el enlace público de solo lectura.';

-- ============================================================
-- Tabla: photos
-- ============================================================

create table public.photos (
  id bigint generated always as identity primary key,
  album_id bigint not null references public.albums (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  caption text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index photos_album_id_idx on public.photos (album_id);
create index photos_user_id_idx on public.photos (user_id);
create unique index photos_storage_path_idx on public.photos (storage_path);

comment on table public.photos is 'Fotos individuales, cada una perteneciente a un álbum. storage_path apunta al objeto en el bucket "photos".';

-- ============================================================
-- updated_at automático en albums
-- ============================================================

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger albums_set_updated_at
  before update on public.albums
  for each row
  execute function private.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.albums enable row level security;
alter table public.photos enable row level security;

-- albums: el dueño tiene control total sobre sus propios álbumes.
create policy "Owners can view their albums"
  on public.albums for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Owners can create albums"
  on public.albums for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Owners can update their albums"
  on public.albums for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Owners can delete their albums"
  on public.albums for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- photos: el dueño tiene control total sobre las fotos de sus álbumes.
create policy "Owners can view their photos"
  on public.photos for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Owners can add photos"
  on public.photos for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.albums
      where albums.id = album_id
        and albums.user_id = (select auth.uid())
    )
  );

create policy "Owners can update their photos"
  on public.photos for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Owners can delete their photos"
  on public.photos for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- No hay política para "anon": el acceso público al álbum compartido
-- pasa exclusivamente por la función private.get_shared_album() de abajo,
-- que sí puede leer las tablas porque es security definer.

-- ============================================================
-- Acceso público de solo lectura vía share_token
-- ============================================================

-- Devuelve un álbum y sus fotos si el share_token coincide.
-- No requiere sesión: se llama desde el cliente anónimo con supabase.rpc(...).
create or replace function public.get_shared_album(token uuid)
returns table (
  album_id bigint,
  album_title text,
  album_description text,
  photo_id bigint,
  photo_storage_path text,
  photo_caption text,
  photo_position integer
)
language sql
security definer
set search_path = ''
stable
as $$
  select
    a.id,
    a.title,
    a.description,
    p.id,
    p.storage_path,
    p.caption,
    p.position
  from public.albums a
  left join public.photos p on p.album_id = a.id
  where a.share_token = token
  order by p.position asc, p.id asc;
$$;

-- Cualquiera (incluido un visitante sin cuenta) puede llamar a esta función,
-- pero solo obtiene resultados para el token exacto que conoce.
grant execute on function public.get_shared_album(uuid) to anon, authenticated;

-- ============================================================
-- Storage: bucket privado "photos"
-- ============================================================

insert into storage.buckets (id, name, public)
values ('photos', 'photos', false)
on conflict (id) do nothing;

-- Convención de path: {user_id}/{album_id}/{filename}
-- storage.foldername(name) devuelve un array con los segmentos de carpeta.

create policy "Owners can upload their photos"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "Owners can view their photos in storage"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "Owners can update their photos in storage"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "Owners can delete their photos in storage"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

-- El bucket es privado y no tiene política para "anon": las imágenes de un
-- álbum compartido se sirven mediante URLs firmadas (createSignedUrl) que tu
-- código genera en el servidor después de validar el share_token con
-- get_shared_album(). Así el visitante nunca necesita acceso directo al bucket.
