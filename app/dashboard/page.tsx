import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlus, Images } from "lucide-react";
import { verifySession } from "@/lib/supabase/dal";
import { createClient } from "@/lib/supabase/server";
import { CreateAlbumForm } from "./create-album-form";

export const metadata: Metadata = {
  title: "Tus álbumes — Revelo",
};

export default async function DashboardPage() {
  const { claims } = await verifySession();
  const name = (claims.user_metadata?.name as string | undefined) ?? claims.email;

  const supabase = await createClient();
  const { data: albums } = await supabase
    .from("albums")
    .select("id, title, photos(count), cover:photos(storage_path)")
    .order("position", { referencedTable: "cover", ascending: true })
    .limit(1, { referencedTable: "cover" })
    .order("created_at", { ascending: false });

  const albumsWithCovers = await Promise.all(
    (albums ?? []).map(async (album) => {
      const coverPath = album.cover?.[0]?.storage_path;
      if (!coverPath) {
        return { ...album, coverUrl: null };
      }
      const { data } = await supabase.storage
        .from("photos")
        .createSignedUrl(coverPath, 60 * 60);
      return { ...album, coverUrl: data?.signedUrl ?? null };
    })
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Hola, {name}</h1>
          <p className="text-muted">Tus álbumes</p>
        </div>
        <CreateAlbumForm />
      </div>

      {albumsWithCovers.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {albumsWithCovers.map((album) => {
            const photoCount = album.photos?.[0]?.count ?? 0;
            return (
              <Link
                key={album.id}
                href={`/dashboard/${album.id}`}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-card-muted shadow-sm transition-shadow group-hover:shadow-md">
                  {album.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={album.coverUrl}
                      alt=""
                      className="size-full object-cover transition-transform group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <Images className="size-8 text-muted" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="truncate font-medium">{album.title}</p>
                  <p className="text-sm text-muted">
                    {photoCount} {photoCount === 1 ? "foto" : "fotos"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border py-24 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent/10">
            <ImagePlus className="size-7 text-accent" strokeWidth={1.75} />
          </div>
          <div>
            <p className="font-medium">Todavía no tienes álbumes</p>
            <p className="text-sm text-muted">Crea el primero para empezar a compartir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
