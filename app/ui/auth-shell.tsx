import Image from "next/image";
import Link from "next/link";
import { SafelightGlow } from "./marketing";
import { photos, type PhotoKey } from "./photos";

// Posición de cada una de las tres fotos colgadas del panel.
const hangingSlots = [
  { rotate: -8, className: "top-[14%] left-[10%]" },
  { rotate: 6, className: "top-[30%] right-[8%]" },
  { rotate: -3, className: "bottom-[12%] left-[22%]" },
];

/**
 * Marco de login y registro: formulario a la izquierda y, en escritorio, el
 * panel tintado con fotos "secándose" del cuarto oscuro a la derecha.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  photos: shellPhotos,
  children,
  footer,
}: {
  eyebrow: React.ReactNode;
  photos: [PhotoKey, PhotoKey, PhotoKey];
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section className="px-4 pt-4 pb-16">
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card lg:min-h-[44rem] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-14">
          <div className="mx-auto flex w-full max-w-sm flex-col">
            <span className="self-start">{eyebrow}</span>

            <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-muted">{description}</p>

            {children}

            <div className="mt-8 text-sm text-muted">{footer}</div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden bg-tint lg:block">
          <SafelightGlow />
          {shellPhotos.map((photo, i) => {
            const { rotate, className } = hangingSlots[i];
            return (
              <div
                key={photo}
                className={`absolute w-56 rounded-md bg-white p-2.5 pb-10 shadow-2xl xl:w-64 ${className}`}
                style={{ rotate: `${rotate}deg` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-card-muted">
                  <Image
                    src={photos[photo].src}
                    alt=""
                    fill
                    sizes="16rem"
                    className="animate-develop object-cover"
                  />
                </div>
              </div>
            );
          })}
          <p className="absolute right-10 bottom-10 font-display text-4xl text-accent italic">
            Revela tus momentos.
          </p>
        </div>
      </div>
    </section>
  );
}

export function AuthLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
    >
      {children}
    </Link>
  );
}
