"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { photos, type PhotoKey } from "./photos";

type Mode = "normal" | "reveal";

const moments: {
  photo: PhotoKey;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
}[] = [
  {
    photo: "bouquet",
    tag: "Bodas",
    tagClass: "bg-rose",
    title: "El gran día",
    description:
      "Reúne las fotos de la ceremonia y envía un único enlace a todos los invitados. Nadie tiene que descargar una app.",
  },
  {
    photo: "lake",
    tag: "Viajes",
    tagClass: "bg-sun",
    title: "La ruta completa",
    description:
      "Del primer amanecer al último atardecer. Comparte el viaje con la familia mientras sigues en camino.",
  },
  {
    photo: "friends",
    tag: "Amigos",
    tagClass: "bg-lilac",
    title: "Los de siempre",
    description:
      "Cumpleaños, escapadas, reencuentros. Un álbum por momento, fácil de encontrar cuando quieras volver.",
  },
];

/**
 * Las tres tarjetas de casos de uso con un selector que muestra cómo se ve
 * el álbum compartido en modo normal o en "modo revelar" (fotos veladas
 * hasta que el visitante las toca).
 */
export function MomentsShowcase() {
  const [mode, setMode] = useState<Mode>("normal");
  const [revealed, setRevealed] = useState<Set<PhotoKey>>(() => new Set());

  function selectMode(next: Mode) {
    setMode(next);
    setRevealed(new Set());
  }

  return (
    <div className="flex flex-col items-center gap-12">
      <div
        role="tablist"
        aria-label="Cómo verán el álbum tus invitados"
        className="inline-flex rounded-full border border-border bg-card p-1 text-sm font-medium"
      >
        {(
          [
            ["normal", "Álbum normal"],
            ["reveal", "Modo revelar"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => selectMode(value)}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2 transition-colors ${
              mode === value
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {value === "reveal" && <Sparkles className="size-3.5" />}
            {label}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
        {moments.map((moment) => {
          const photo = photos[moment.photo];
          const hidden = mode === "reveal" && !revealed.has(moment.photo);
          return (
            <article key={moment.photo} className="flex flex-col gap-5">
              <button
                type="button"
                disabled={!hidden}
                onClick={() =>
                  setRevealed((prev) => new Set(prev).add(moment.photo))
                }
                aria-label={hidden ? `Revelar foto: ${photo.alt}` : undefined}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-card-muted disabled:cursor-default"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    hidden
                      ? "scale-110 blur-2xl saturate-0"
                      : "scale-100 group-hover:scale-105"
                  }`}
                />
                <span
                  className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium text-ink ${moment.tagClass}`}
                >
                  {moment.tag}
                </span>
                {hidden && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20 text-white">
                    <span className="flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                      <Sparkles className="size-5" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-widest">
                      Toca para revelar
                    </span>
                  </span>
                )}
              </button>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium tracking-tight">
                  {moment.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {moment.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
