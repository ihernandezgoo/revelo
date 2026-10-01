"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/supabase/dal";

export type AlbumFormState = {
  error?: string;
} | null;

export async function createAlbum(
  _prevState: AlbumFormState,
  formData: FormData
): Promise<AlbumFormState> {
  const { claims } = await verifySession();
  const title = (formData.get("title") as string | null)?.trim();

  if (!title) {
    return { error: "Ponle un nombre al álbum." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .insert({ title, user_id: claims.sub })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "No se pudo crear el álbum. Inténtalo de nuevo." };
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/${data.id}`);
}

export type UpdateAlbumState = {
  error?: string;
} | null;

export async function updateAlbum(
  albumId: number,
  _prevState: UpdateAlbumState,
  formData: FormData
): Promise<UpdateAlbumState> {
  const { claims } = await verifySession();
  const title = (formData.get("title") as string | null)?.trim();
  const description = (formData.get("description") as string | null)?.trim() ?? null;

  if (!title) {
    return { error: "Ponle un nombre al álbum." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("albums")
    .update({ title, description: description || null })
    .eq("id", albumId)
    .eq("user_id", claims.sub);

  if (error) {
    return { error: "No se pudo guardar. Inténtalo de nuevo." };
  }

  revalidatePath(`/dashboard/${albumId}`);
  revalidatePath("/dashboard");
  return null;
}

export async function setAlbumRevealMode(albumId: number, revealMode: boolean) {
  const { claims } = await verifySession();
  const supabase = await createClient();

  await supabase
    .from("albums")
    .update({ reveal_mode: revealMode })
    .eq("id", albumId)
    .eq("user_id", claims.sub);

  revalidatePath(`/dashboard/${albumId}`);
}

export async function deleteAlbum(albumId: number) {
  await verifySession();
  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("storage_path")
    .eq("album_id", albumId);

  if (photos && photos.length > 0) {
    await supabase.storage
      .from("photos")
      .remove(photos.map((photo) => photo.storage_path));
  }

  await supabase.from("albums").delete().eq("id", albumId);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Los archivos los sube el navegador directamente a Storage (ver
// upload-photos-form.tsx): un Server Action no puede recibir fotos grandes
// por el límite de tamaño del body. Aquí solo se registran las rutas.
export async function addPhotos(
  albumId: number,
  storagePaths: string[]
): Promise<{ error?: string }> {
  const { claims } = await verifySession();

  // Solo se aceptan rutas dentro de la carpeta del usuario y de este álbum:
  // la página pública firma URLs con el cliente admin, así que no se puede
  // permitir registrar objetos ajenos.
  const prefix = `${claims.sub}/${albumId}/`;
  const paths = Array.from(new Set(storagePaths)).filter(
    (path) => path.startsWith(prefix) && !path.slice(prefix.length).includes("/")
  );

  if (paths.length === 0) {
    return { error: "No se pudo subir ninguna foto." };
  }

  const supabase = await createClient();

  const { data: album } = await supabase
    .from("albums")
    .select("id")
    .eq("id", albumId)
    .eq("user_id", claims.sub)
    .single();

  if (!album) {
    return { error: "Álbum no encontrado." };
  }

  const { data: existing } = await supabase
    .from("photos")
    .select("position")
    .eq("album_id", albumId)
    .order("position", { ascending: false })
    .limit(1);

  const firstPosition = (existing?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("photos").insert(
    paths.map((path, i) => ({
      album_id: albumId,
      user_id: claims.sub,
      storage_path: path,
      position: firstPosition + i,
    }))
  );

  if (error) {
    return { error: "No se pudieron guardar las fotos. Inténtalo de nuevo." };
  }

  revalidatePath(`/dashboard/${albumId}`);
  return {};
}

export async function deletePhoto(photoId: number, albumId: number) {
  const { claims } = await verifySession();
  const supabase = await createClient();

  const { data: photo } = await supabase
    .from("photos")
    .select("storage_path")
    .eq("id", photoId)
    .eq("user_id", claims.sub)
    .single();

  if (photo) {
    await supabase.storage.from("photos").remove([photo.storage_path]);
    await supabase.from("photos").delete().eq("id", photoId);
  }

  revalidatePath(`/dashboard/${albumId}`);
}

export async function deletePhotos(albumId: number, photoIds: number[]) {
  const { claims } = await verifySession();

  if (photoIds.length === 0) {
    return;
  }

  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("storage_path")
    .in("id", photoIds)
    .eq("user_id", claims.sub);

  if (photos && photos.length > 0) {
    await supabase.storage
      .from("photos")
      .remove(photos.map((photo) => photo.storage_path));
  }

  await supabase.from("photos").delete().in("id", photoIds).eq("user_id", claims.sub);

  revalidatePath(`/dashboard/${albumId}`);
}
