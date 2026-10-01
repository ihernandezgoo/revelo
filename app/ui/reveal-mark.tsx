// Formas del logo en un lienzo de 24×24. Las comparten el componente
// RevealMark y los iconos de app (app/ui/app-icon.tsx). app/icon.svg es una
// copia estática del mismo trazado.
export const LOGO_TILE =
  "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z";
export const LOGO_SUN = "M6 18a6 6 0 0 1 12 0Z";
export const LOGO_SPARKLE =
  "M17 8.25l.7 1.55 1.55.7-1.55.7L17 12.75l-.7-1.55-1.55-.7 1.55-.7Z";

/**
 * Logo de Revelo: una copia fotográfica con un sol que asoma (la imagen
 * "revelándose") y un destello. Es una sola forma calada, así que hereda el
 * color con `currentColor` y se lee bien incluso a 16px.
 */
export function RevealMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d={`${LOGO_TILE}${LOGO_SUN}${LOGO_SPARKLE}`}
      />
    </svg>
  );
}
