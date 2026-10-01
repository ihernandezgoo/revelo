"use client";

import { useActionState, useState } from "react";
import { Pencil } from "lucide-react";
import { updateAlbum } from "@/app/actions/albums";
import { errorClass, plainFieldClass, primaryButtonClass } from "@/app/ui/form-styles";

export function EditAlbumDetails({
  albumId,
  title,
  description,
}: {
  albumId: number;
  title: string;
  description: string | null;
}) {
  const [editing, setEditing] = useState(false);
  const updateThisAlbum = updateAlbum.bind(null, albumId);
  const [state, formAction, pending] = useActionState(updateThisAlbum, null);

  if (!editing) {
    return (
      <div className="flex max-w-full flex-col items-start gap-4">
        <h1 className="max-w-full text-balance break-words text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl text-balance text-lg text-muted">{description}</p>
        )}
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 rounded-full border border-foreground/15 bg-card/60 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/40"
        >
          <Pencil className="size-3.5" />
          Editar detalles
        </button>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        await formAction(formData);
        setEditing(false);
      }}
      className="flex w-full max-w-lg flex-col gap-3 rounded-3xl bg-card p-4 shadow-xl shadow-black/5"
    >
      <input
        name="title"
        type="text"
        required
        defaultValue={title}
        placeholder="Nombre del álbum"
        className={`${plainFieldClass} text-lg font-medium`}
      />
      <textarea
        name="description"
        defaultValue={description ?? ""}
        placeholder="Descripción (opcional)"
        rows={2}
        className={`${plainFieldClass} resize-none`}
      />
      <div className="flex items-center gap-2">
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Guardando…" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Cancelar
        </button>
      </div>
      {state?.error && (
        <p role="alert" className={errorClass}>
          {state.error}
        </p>
      )}
    </form>
  );
}
