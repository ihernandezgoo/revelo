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

export type UploadPhotosState = {
  error?: string;
} | null;

export async function uploadPhotos(
  albumId: number,
  _prevState: UploadPhotosState,
  formData: FormData
): Promise<UploadPhotosState> {
  const { claims } = await verifySession();
  const files = formData.getAll("files") as File[];
  const validFiles = files.filter((file) => file.size > 0);

  if (validFiles.length === 0) {
    return { error: "Elige al menos una foto." };
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

  let nextPosition = (existing?.[0]?.position ?? -1) + 1;

  for (const file of validFiles) {
    const extension = file.name.split(".").pop() ?? "jpg";
    const path = `${claims.sub}/${albumId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      continue;
    }

    await supabase.from("photos").insert({
      album_id: albumId,
      user_id: claims.sub,
      storage_path: path,
      position: nextPosition,
    });

    nextPosition += 1;
  }

  revalidatePath(`/dashboard/${albumId}`);
  return null;
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
