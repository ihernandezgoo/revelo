import { ImageResponse } from "next/og";
import { LOGO_SPARKLE, LOGO_SUN } from "./reveal-mark";

// Colores fijos: los iconos de la pantalla de inicio no siguen el tema.
const ICON_BACKGROUND = "#d63a1a";
const ICON_FOREGROUND = "#fbf8f3";

/**
 * Icono de app en PNG: el logo a sangre (el fondo rojo hace de "copia" y el
 * sol y el destello van en crema). Los sistemas operativos ya redondean el
 * icono, por eso no se dibuja la esquina redondeada del logo.
 *
 * `scale` encoge el dibujo hacia el centro; los iconos "maskable" de Android
 * lo necesitan para que nada quede fuera de la zona segura al recortarlos.
 */
export function renderAppIcon(size: number, scale = 1) {
  // El logo ocupa el cuadrado 2..22 del lienzo de 24; se amplía el viewBox
  // alrededor del centro (12, 12) para dejar margen.
  const half = 10 / scale;
  const viewBox = `${12 - half} ${12 - half} ${half * 2} ${half * 2}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: ICON_BACKGROUND,
        }}
      >
        <svg width={size} height={size} viewBox={viewBox}>
          <path d={LOGO_SUN} fill={ICON_FOREGROUND} />
          <path d={LOGO_SPARKLE} fill={ICON_FOREGROUND} />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
