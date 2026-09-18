import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { verifySession } from "@/lib/supabase/dal";
import { createClient } from "@/lib/supabase/server";
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
    .select("id, title, description, share_token")
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
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Tus álbumes
      </Link>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <EditAlbumDetails
          albumId={album.id}
          title={album.title}
          description={album.description}
        />
        <div className="flex flex-wrap items-center gap-2">
          <CopyLinkButton url={shareUrl} />
          <DeleteAlbumButton albumId={album.id} />
        </div>
      </div>

      <div className="mt-8">
        <UploadPhotosForm albumId={album.id} />
      </div>

      {photosWithUrls.length > 0 ? (
        <div className="mt-8">
          <PhotoGallery
            albumId={album.id}
            photos={photosWithUrls
              .filter((photo) => photo.url)
              .map((photo) => ({ id: photo.id, url: photo.url as string }))}
          />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border py-24 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent/10">
            <ImagePlus className="size-7 text-accent" strokeWidth={1.75} />
          </div>
          <div>
            <p className="font-medium">Este álbum todavía no tiene fotos</p>
            <p className="text-sm text-muted">Añade las primeras para empezar.</p>
          </div>
        </div>
      )}
    </div>
  );
}
