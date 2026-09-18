"use client";

import { useActionState, useState } from "react";
import { Pencil } from "lucide-react";
import { updateAlbum } from "@/app/actions/albums";

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
      <div className="flex items-start gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-muted">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mt-1.5 flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          <Pencil className="size-3.5" />
          Editar
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
      className="flex flex-col gap-2"
    >
      <input
        name="title"
        type="text"
        required
        defaultValue={title}
        placeholder="Nombre del álbum"
        className="w-full max-w-md rounded-xl border border-border bg-background px-4 py-2 text-lg font-semibold outline-none transition-colors focus:border-accent"
      />
      <textarea
        name="description"
        defaultValue={description ?? ""}
        placeholder="Descripción (opcional)"
        rows={2}
        className="w-full max-w-md resize-none rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-accent"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
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
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
