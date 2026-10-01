import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ImagePlus, Images } from "lucide-react";
import { verifySession } from "@/lib/supabase/dal";
import { createClient } from "@/lib/supabase/server";
import { Accent, Eyebrow, SafelightGlow } from "@/app/ui/marketing";
import { RevealMark } from "@/app/ui/reveal-mark";
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

  const totalPhotos = albumsWithCovers.reduce(
    (sum, album) => sum + (album.photos?.[0]?.count ?? 0),
    0
  );

  return (
    <div className="pb-24">
      <section className="px-4 pt-4">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-hidden rounded-[2rem] bg-tint px-6 py-14 sm:px-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between">
          <SafelightGlow />
          <div className="relative flex flex-col items-start gap-5">
            <Eyebrow icon={Images}>Tus álbumes</Eyebrow>
            <h1 className="text-balance break-words text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              Hola, <Accent>{name}</Accent>
            </h1>
            <div className="flex gap-8">
              <Stat value={albumsWithCovers.length} label={albumsWithCovers.length === 1 ? "álbum" : "álbumes"} />
              <Stat value={totalPhotos} label={totalPhotos === 1 ? "foto" : "fotos"} />
            </div>
          </div>
          <div className="relative">
            <CreateAlbumForm />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pt-14">
        {albumsWithCovers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {albumsWithCovers.map((album) => {
              const photoCount = album.photos?.[0]?.count ?? 0;
              return (
                <Link
                  key={album.id}
                  href={`/dashboard/${album.id}`}
                  className="group flex flex-col gap-4 rounded-[1.75rem] border border-border bg-card p-3 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card-muted">
                    {album.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={album.coverUrl}
                        alt=""
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-2 bg-tint text-accent">
                        <ImagePlus className="size-8" strokeWidth={1.5} />
                        <span className="text-xs font-medium">Sin fotos todavía</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium backdrop-blur">
                      {photoCount} {photoCount === 1 ? "foto" : "fotos"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-2 pb-2">
                    <p className="truncate text-lg font-medium tracking-tight">
                      {album.title}
                    </p>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 rounded-[2rem] border-2 border-dashed border-border px-6 py-24 text-center">
            <RevealMark className="size-14 text-accent" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-medium tracking-tight">
                Tu primer álbum te <Accent>espera</Accent>
              </p>
              <p className="text-muted">
                Crea un álbum, sube tus fotos y comparte el enlace.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-semibold tracking-tight">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
