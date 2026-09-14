"use client";

import { useActionState, useRef } from "react";
import { Upload } from "lucide-react";
import { uploadPhotos } from "@/app/actions/albums";

export function UploadPhotosForm({ albumId }: { albumId: number }) {
  const uploadPhotosForAlbum = uploadPhotos.bind(null, albumId);
  const [state, formAction, pending] = useActionState(uploadPhotosForAlbum, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col items-start gap-2"
    >
      <label className="flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90">
        <Upload className="size-4" />
        {pending ? "Subiendo…" : "Añadir fotos"}
        <input
          type="file"
          name="files"
          accept="image/*"
          multiple
          required
          disabled={pending}
          className="hidden"
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
        />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
