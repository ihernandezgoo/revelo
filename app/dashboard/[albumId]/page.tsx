import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { verifySession } from "@/lib/supabase/dal";
import { createClient } from "@/lib/supabase/server";
import { Accent, SafelightGlow } from "@/app/ui/marketing";
import { RevealMark } from "@/app/ui/reveal-mark";
import { CopyLinkButton } from "./copy-link-button";
import { DeleteAlbumButton } from "./delete-album-button";
import { EditAlbumDetails } from "./edit-album-details";
import { PhotoGallery } from "./photo-gallery";
import { UploadPhotosForm } from "./upload-photos-form";

export const metadata: Metadata = {
  title: "Álbum — Revelo",
};

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const { claims } = await verifySession();
  const supabase = await createClient();

  const { data: album } = await supabase
    .from("albums")
    .select("id, title, description, share_token, reveal_mode")
    .eq("id", albumId)
    .eq("user_id", claims.sub)
    .single();

  if (!album) {
    notFound();
  }

  const { data: photos } = await supabase
    .from("photos")
    .select("id, storage_path")
    .eq("album_id", album.id)
    .order("position", { ascending: true });

  const photosWithUrls = await Promise.all(
    (photos ?? []).map(async (photo) => {
      const { data } = await supabase.storage
        .from("photos")
        .createSignedUrl(photo.storage_path, 60 * 60);
      return { ...photo, url: data?.signedUrl ?? null };
    })
  );

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://reveloweb.vercel.app"}/${album.share_token}`;

  return (
    <div className="pb-24">
      <section className="px-4 pt-4">
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-tint px-6 py-10 sm:px-14 sm:py-14 lg:grid-cols-[1fr_24rem] lg:items-end">
          <SafelightGlow />
          <div className="relative flex min-w-0 flex-col items-start gap-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-sm font-medium backdrop-blur transition-colors hover:bg-card"
            >
              <ArrowLeft className="size-4" />
              Tus álbumes
            </Link>
            <EditAlbumDetails
              albumId={album.id}
              title={album.title}
              description={album.description}
            />
          </div>

          <div className="relative flex flex-col gap-3">
            <CopyLinkButton
              url={shareUrl}
              albumId={album.id}
              initialRevealMode={album.reveal_mode}
            />
            <DeleteAlbumButton albumId={album.id} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-10">
        <UploadPhotosForm albumId={album.id} userId={claims.sub} />

        {photosWithUrls.length > 0 ? (
          <PhotoGallery
            albumId={album.id}
            photos={photosWithUrls
              .filter((photo) => photo.url)
              .map((photo) => ({ id: photo.id, url: photo.url as string }))}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 rounded-[2rem] bg-card px-6 py-20 text-center">
            <RevealMark className="size-12 text-accent" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-medium tracking-tight">
                Este álbum está <Accent>por revelar</Accent>
              </p>
              <p className="text-muted">Añade las primeras fotos para empezar.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
