import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de ejemplo de las páginas de marketing (app/ui/photos.ts).
    // Sin `search`, para permitir los parámetros de recorte de Unsplash.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
    ],
  },
};

export default nextConfig;
