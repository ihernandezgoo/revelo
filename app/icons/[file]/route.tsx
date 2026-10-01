import type { NextRequest } from "next/server";
import { renderAppIcon } from "../../ui/app-icon";

// Iconos PNG del manifest (Android / "Instalar app"). Llevan extensión .png
// para que proxy.ts no los intercepte.
const icons: Record<string, { size: number; scale?: number }> = {
  "icon-192.png": { size: 192 },
  "icon-512.png": { size: 512 },
  // Zona segura de los iconos maskable: el círculo central del 80%.
  "icon-maskable-512.png": { size: 512, scale: 0.7 },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(icons).map((file) => ({ file }));
}

export async function GET(_req: NextRequest, ctx: RouteContext<"/icons/[file]">) {
  const { file } = await ctx.params;
  const { size, scale } = icons[file];
  return renderAppIcon(size, scale);
}
