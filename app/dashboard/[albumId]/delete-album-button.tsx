import { Trash2 } from "lucide-react";
import { deleteAlbum } from "@/app/actions/albums";

export function DeleteAlbumButton({ albumId }: { albumId: number }) {
  const deleteThisAlbum = deleteAlbum.bind(null, albumId);

  return (
    <form action={deleteThisAlbum} className="flex justify-end">
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
      >
        <Trash2 className="size-4" />
        Eliminar álbum
      </button>
    </form>
  );
}
