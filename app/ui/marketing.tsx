import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, type LucideIcon } from "lucide-react";
import { photos } from "./photos";

// Piezas compartidas por la landing, /como-funciona y /caracteristicas.

export function Eyebrow({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-medium tracking-wide text-accent">
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}
    >
      {eyebrow}
      <h2 className="max-w-3xl text-balance text-4xl font-medium tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-balance text-muted">{description}</p>
      )}
    </div>
  );
}

/** Palabra destacada en serif itálica dentro de un titular. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-normal italic tracking-normal text-accent">
      {children}
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/40"
    >
      {children}
    </Link>
  );
}

/** Cabecera tintada de las páginas secundarias. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-tint px-6 py-20 sm:px-14 sm:py-28">
        <SafelightGlow />
        <div className="relative flex flex-col items-start gap-6">
          {eyebrow}
          <h1 className="max-w-3xl text-balance text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">
            {title}
          </h1>
          <p className="max-w-xl text-balance text-lg text-muted">{description}</p>
        </div>
      </div>
    </section>
  );
}

/** Halo de luz roja de cuarto oscuro, decorativo. */
export function SafelightGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-accent/25 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 size-[22rem] rounded-full bg-sun/30 blur-3xl" />
    </div>
  );
}

export type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center gap-4 font-medium [&::-webkit-details-marker]:hidden">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-card-muted text-muted transition-colors group-open:bg-accent group-open:text-accent-foreground">
              <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
            </span>
            {item.question}
          </summary>
          <p className="mt-3 pl-11 text-sm leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/** Banda final de llamada a la acción, con tira de fotos "colgadas". */
export function CtaBanner() {
  const strip = [photos.wedding, photos.lake, photos.friends];
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 overflow-hidden rounded-[2rem] bg-ink px-6 py-16 ring-1 ring-white/10 text-paper sm:px-14 lg:grid-cols-2 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-20 size-[30rem] rounded-full bg-safelight/30 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6">
          <h2 className="max-w-lg text-balance text-4xl font-medium tracking-tight sm:text-6xl">
            Tus fotos merecen ser{" "}
            <span className="font-display italic text-rose">reveladas</span>
          </h2>
          <p className="max-w-md text-balance text-paper/70">
            Crea tu cuenta gratis y comparte tu primer álbum en minutos.
          </p>
          <Link
            href="/registro"
            className="group inline-flex items-center gap-2 rounded-full bg-safelight px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-rose"
          >
            Empezar ahora
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative flex h-64 items-center justify-center sm:h-80">
          {strip.map((photo, i) => (
            <div
              key={photo.src}
              className="absolute w-40 rounded-md bg-white p-2 pb-8 shadow-2xl sm:w-52"
              style={{
                rotate: `${(i - 1) * 9}deg`,
                translate: `${(i - 1) * 62}% ${i === 1 ? -6 : 6}%`,
                zIndex: i === 1 ? 2 : 1,
              }}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm bg-card-muted">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="13rem"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
