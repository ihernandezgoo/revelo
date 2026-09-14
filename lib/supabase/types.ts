export type Album = {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  share_token: string;
  created_at: string;
  updated_at: string;
};

export type Photo = {
  id: number;
  album_id: number;
  user_id: string;
  storage_path: string;
  caption: string | null;
  position: number;
  created_at: string;
};

// Row shape returned by the public.get_shared_album(token) RPC.
export type SharedAlbumRow = {
  album_id: number;
  album_title: string;
  album_description: string | null;
  photo_id: number | null;
  photo_storage_path: string | null;
  photo_caption: string | null;
  photo_position: number | null;
};
