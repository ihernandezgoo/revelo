import type { Metadata } from "next";
import { ImagePlus } from "lucide-react";
import { verifySession } from "@/lib/supabase/dal";

export const metadata: Metadata = {
  title: "Tus álbumes — Revelo",
};

export default async function DashboardPage() {
  const { claims } = await verifySession();
  const name = (claims.user_metadata?.name as string | undefined) ?? claims.email;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hola, {name}
        </h1>
        <p className="text-muted">Aquí verás y crearás tus álbumes.</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border py-24 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-accent/10">
          <ImagePlus className="size-7 text-accent" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-medium">Todavía no tienes álbumes</p>
          <p className="text-sm text-muted">Crea el primero para empezar a compartir.</p>
        </div>
        <button
          type="button"
          className="mt-2 rounded-full bg-accent px-6 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Crear álbum
        </button>
      </div>
    </div>
  );
}
