"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { createAlbum } from "@/app/actions/albums";

export function CreateAlbumForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createAlbum, null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        <Plus className="size-4" />
        Nuevo álbum
      </button>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex w-full max-w-sm items-center gap-2">
        <input
          ref={inputRef}
          name="title"
          type="text"
          required
          placeholder="Nombre del álbum"
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creando…" : "Crear"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cancelar"
          className="shrink-0 rounded-full p-2.5 text-muted transition-colors hover:text-foreground"
        >
          <X className="size-4" />
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
