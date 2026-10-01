"use client";

import { useState, useTransition } from "react";
import { Loader2, Upload } from "lucide-react";
import { addPhotos } from "@/app/actions/albums";
import { createClient } from "@/lib/supabase/client";
import { errorClass } from "@/app/ui/form-styles";

// Fotos que se suben a la vez; más no acelera y satura conexiones lentas.
const CONCURRENCY = 3;

export function UploadPhotosForm({
  albumId,
  userId,
}: {
  albumId: number;
  userId: string;
}) {
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, startTransition] = useTransition();
  const busy = progress !== null || isSaving;

  async function handleFiles(fileList: FileList) {
    const files = Array.from(fileList).filter((file) => file.size > 0);
    if (files.length === 0) return;

    setError(null);
    setProgress({ done: 0, total: files.length });

    // Las fotos van directas del navegador a Storage; las políticas del bucket
    // solo permiten escribir en la carpeta {userId}/ del usuario autenticado.
    const supabase = createClient();
    const uploaded: string[] = [];
    let failed = 0;
    let next = 0;

    async function worker() {
      while (next < files.length) {
        const file = files[next++];
        const extension =
          file.name.match(/\.([a-z0-9]{1,5})$/i)?.[1].toLowerCase() ?? "jpg";
        const path = `${userId}/${albumId}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(path, file, { contentType: file.type });

        if (uploadError) {
          failed += 1;
        } else {
          uploaded.push(path);
        }
        setProgress((prev) => prev && { ...prev, done: prev.done + 1 });
      }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setProgress(null);

    if (uploaded.length === 0) {
      setError("No se pudo subir ninguna foto. Inténtalo de nuevo.");
      return;
    }

    startTransition(async () => {
      const result = await addPhotos(albumId, uploaded);
      if (result.error) {
        // Sin fila en la base de datos los archivos quedarían huérfanos.
        await supabase.storage.from("photos").remove(uploaded);
        setError(result.error);
      } else if (failed > 0) {
        setError(
          `${failed} ${failed === 1 ? "foto no se pudo subir" : "fotos no se pudieron subir"}. Inténtalo de nuevo con ${failed === 1 ? "ella" : "ellas"}.`
        );
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        className={`group flex cursor-pointer flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-card px-6 py-10 text-center transition-colors hover:border-accent/60 hover:bg-tint/40 sm:flex-row sm:text-left ${
          busy ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/20 transition-transform group-hover:-translate-y-0.5">
          {busy ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Upload className="size-6" />
          )}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-lg font-medium tracking-tight">
            {progress
              ? `Subiendo ${progress.done} de ${progress.total}…`
              : isSaving
                ? "Guardando fotos…"
                : "Añadir fotos"}
          </span>
          <span className="text-sm text-muted">
            Elige una o varias fotos a la vez de tu dispositivo.
          </span>
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={busy}
          className="hidden"
          onChange={(event) => {
            const input = event.currentTarget;
            if (input.files) {
              handleFiles(input.files);
            }
            input.value = "";
          }}
        />
      </label>
      {error && (
        <p role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}
