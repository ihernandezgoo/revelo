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
    .select("id, title, photos(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hola, {name}
        </h1>
        <p className="text-muted">Aquí verás y crearás tus álbumes.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6">
        <CreateAlbumForm />
      </div>

      {albums && albums.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => {
            const photoCount = album.photos?.[0]?.count ?? 0;
            return (
              <Link
                key={album.id}
                href={`/dashboard/${album.id}`}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-accent/10">
                  <Images className="size-6 text-accent" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-medium">{album.title}</p>
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
