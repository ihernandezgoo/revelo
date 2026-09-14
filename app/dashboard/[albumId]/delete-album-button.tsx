import { Trash2 } from "lucide-react";
import { deleteAlbum } from "@/app/actions/albums";

export function DeleteAlbumButton({ albumId }: { albumId: number }) {
  const deleteThisAlbum = deleteAlbum.bind(null, albumId);

  return (
    <form action={deleteThisAlbum}>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-red-300 hover:text-red-600 dark:hover:text-red-400"
      >
        <Trash2 className="size-4" />
        Eliminar álbum
      </button>
    </form>
  );
}
