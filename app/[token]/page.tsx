import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SharedAlbumRow } from "@/lib/supabase/types";
import { RevealMark } from "@/app/ui/reveal-mark";

export const metadata: Metadata = {
  title: "Álbum compartido — Revelo",
};

export default async function SharedAlbumPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: rows } = await supabase.rpc("get_shared_album", { token }) as {
    data: SharedAlbumRow[] | null;
  };

  if (!rows || rows.length === 0) {
    notFound();
  }

  const { album_title: title, album_description: description } = rows[0];
  const photos = rows.filter(
    (row): row is SharedAlbumRow & { photo_id: number; photo_storage_path: string } =>
      row.photo_id !== null && row.photo_storage_path !== null
  );

  // El bucket "photos" es privado y sin acceso anónimo: get_shared_album ya
  // validó el share_token arriba, así que usamos el cliente admin solo para
  // firmar las URLs de las fotos que esa consulta devolvió.
  const adminClient = createAdminClient();
  const photosWithUrls = await Promise.all(
    photos.map(async (photo) => {
      const { data } = await adminClient.storage
        .from("photos")
        .createSignedUrl(photo.photo_storage_path, 60 * 60);
      return { id: photo.photo_id, url: data?.signedUrl ?? null };
    })
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex items-center gap-2 text-sm text-muted">
        <RevealMark className="size-4 text-accent" />
        Revelo
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && <p className="mt-2 text-muted">{description}</p>}

      {photosWithUrls.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photosWithUrls.map((photo) =>
            photo.url ? (
              <div
                key={photo.id}
                className="aspect-square overflow-hidden rounded-2xl border border-border bg-card-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="size-full object-cover" />
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="mt-10 text-muted">Este álbum todavía no tiene fotos.</p>
      )}
    </div>
  );
}
