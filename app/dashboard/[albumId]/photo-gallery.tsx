"use client";

import { useState, useTransition } from "react";
import { Check, Trash2 } from "lucide-react";
import { deletePhotos } from "@/app/actions/albums";

type Photo = {
  id: number;
  url: string;
};

export function PhotoGallery({
  albumId,
  photos,
}: {
  albumId: number;
  photos: Photo[];
}) {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();

  function toggle(photoId: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  }

  function stopSelecting() {
    setSelecting(false);
    setSelected(new Set());
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePhotos(albumId, Array.from(selected));
      stopSelecting();
    });
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-medium tracking-tight">
          {photos.length}{" "}
          <span className="font-display text-accent italic">
            {photos.length === 1 ? "foto" : "fotos"}
          </span>
        </h2>
        {photos.length > 0 && (
          <button
            type="button"
            onClick={() => (selecting ? stopSelecting() : setSelecting(true))}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selecting
                ? "bg-foreground text-background"
                : "border border-foreground/15 bg-card hover:border-foreground/40"
            }`}
          >
            {selecting ? "Cancelar" : "Seleccionar"}
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo) => {
          const isSelected = selected.has(photo.id);
          if (selecting) {
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => toggle(photo.id)}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-card-muted text-left ring-offset-2 ring-offset-background transition-shadow ${
                  isSelected ? "ring-3 ring-accent" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt=""
                  className={`size-full object-cover transition-all ${
                    isSelected ? "scale-95 rounded-xl opacity-80" : ""
                  }`}
                />
                <span
                  className={`absolute right-2 top-2 flex size-6 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-white bg-black/30 text-transparent"
                  }`}
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
              </button>
            );
          }

          return (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-card-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt=""
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>

      {selecting && selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6">
          <div className="flex items-center gap-4 rounded-full bg-ink py-2 pr-2 pl-5 text-paper shadow-2xl ring-1 ring-white/10">
            <span className="text-sm font-medium">
              {selected.size} {selected.size === 1 ? "seleccionada" : "seleccionadas"}
            </span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Trash2 className="size-4" />
              {isPending ? "Eliminando…" : "Eliminar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
