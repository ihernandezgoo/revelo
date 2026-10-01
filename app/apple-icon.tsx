import { renderAppIcon } from "./ui/app-icon";

// Icono de "Añadir a pantalla de inicio" en iPhone/iPad.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderAppIcon(size.width);
}
