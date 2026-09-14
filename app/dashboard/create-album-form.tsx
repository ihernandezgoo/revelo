"use client";

import { useActionState } from "react";
import { createAlbum } from "@/app/actions/albums";

export function CreateAlbumForm() {
  const [state, formAction, pending] = useActionState(createAlbum, null);

  return (
    <form action={formAction} className="flex flex-col items-center gap-3">
      <div className="flex w-full max-w-sm gap-2">
        <input
          name="title"
          type="text"
          required
          placeholder="Nombre del álbum"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-xl bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creando…" : "Crear"}
        </button>
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
