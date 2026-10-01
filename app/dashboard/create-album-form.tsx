"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { createAlbum } from "@/app/actions/albums";
import { errorClass, plainFieldClass, primaryButtonClass } from "@/app/ui/form-styles";

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
      <button type="button" onClick={() => setOpen(true)} className={primaryButtonClass}>
        <Plus className="size-4" />
        Nuevo álbum
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="flex w-full flex-col gap-3 rounded-3xl border border-border bg-card p-3 shadow-xl shadow-black/5 sm:w-[26rem]"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          name="title"
          type="text"
          required
          placeholder="Nombre del álbum"
          className={plainFieldClass}
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cancelar"
          className="shrink-0 rounded-full p-2.5 text-muted transition-colors hover:bg-card-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Creando…" : "Crear álbum"}
      </button>
      {state?.error && (
        <p role="alert" className={errorClass}>
          {state.error}
        </p>
      )}
    </form>
  );
}
