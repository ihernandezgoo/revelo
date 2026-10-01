"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

type Photo = {
  id: number;
  url: string;
};

function readRevealed(storageKey: string): Set<number> {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? new Set(JSON.parse(stored) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

function writeRevealed(storageKey: string, revealed: Set<number>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(revealed)));
  } catch {
    // Visita no persistirá el estado revelado; no es crítico.
  }
}

export function RevealableGallery({
  albumToken,
  photos,
}: {
  albumToken: string;
  photos: Photo[];
}) {
  const storageKey = `revelo:revealed:${albumToken}`;
  // El servidor no tiene localStorage, así que la primera pasada (SSR y la
  // primera pintura en cliente) siempre muestra todo oculto; justo después
  // de montar, leemos lo ya revelado para este visitante.
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());
  const [hasReadStorage, setHasReadStorage] = useState(false);

  if (!hasReadStorage && typeof window !== "undefined") {
    setHasReadStorage(true);
    setRevealed(readRevealed(storageKey));
  }

  function reveal(photoId: number) {
    const next = new Set(revealed);
    next.add(photoId);
    setRevealed(next);
    writeRevealed(storageKey, next);
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => {
        const isRevealed = revealed.has(photo.id);
        return (
          <button
            key={photo.id}
            type="button"
            onClick={() => reveal(photo.id)}
            disabled={isRevealed}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card-muted disabled:cursor-default"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt=""
              className={`size-full object-cover transition-all duration-700 ease-out ${
                isRevealed ? "scale-100 blur-0" : "scale-110 blur-2xl"
              }`}
            />
            {!isRevealed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 text-white transition-opacity group-hover:bg-black/35">
                <Sparkles className="size-6" strokeWidth={1.75} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Toca para revelar
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
