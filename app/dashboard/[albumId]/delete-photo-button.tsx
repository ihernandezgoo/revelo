import { X } from "lucide-react";
import { deletePhoto } from "@/app/actions/albums";

export function DeletePhotoButton({
  photoId,
  albumId,
}: {
  photoId: number;
  albumId: number;
}) {
  const deleteThisPhoto = deletePhoto.bind(null, photoId, albumId);

  return (
    <form action={deleteThisPhoto} className="absolute right-2 top-2">
      <button
        type="submit"
        aria-label="Eliminar foto"
        className="flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="size-4" />
      </button>
    </form>
  );
}
