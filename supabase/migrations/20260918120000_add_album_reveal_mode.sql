-- Revelo: modo "revelar" opcional por álbum. Cuando está activo, la página
-- pública muestra las fotos ocultas (blur) hasta que el visitante hace clic
-- para revelarlas una a una.

alter table public.albums
  add column if not exists reveal_mode boolean not null default false;

comment on column public.albums.reveal_mode is
  'Si es true, la página pública del álbum oculta las fotos hasta que el visitante las revela manualmente.';

-- get_shared_album debe devolver también reveal_mode para que la página
-- pública sepa si debe ocultar las fotos. El shape de retorno cambia, así
-- que hay que borrar la función antes de recrearla.
drop function if exists public.get_shared_album(uuid);

create function public.get_shared_album(token uuid)
returns table (
  album_id bigint,
  album_title text,
  album_description text,
  album_reveal_mode boolean,
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
    a.reveal_mode,
    p.id,
    p.storage_path,
    p.caption,
    p.position
  from public.albums a
  left join public.photos p on p.album_id = a.id
  where a.share_token = token
  order by p.position asc, p.id asc;
$$;

grant execute on function public.get_shared_album(uuid) to anon, authenticated;
