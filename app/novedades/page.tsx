import type { Metadata } from "next";
import {
  FolderHeart,
  History,
  Images,
  Palette,
  Share2,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Accent, CtaBanner, Eyebrow, PageHero } from "../ui/marketing";

export const metadata: Metadata = {
  title: "Novedades — Revelo",
  description:
    "Todo lo que hemos ido revelando en Revelo: nuevas funciones, mejoras y cambios, versión a versión.",
};

type ChangeKind = "nuevo" | "mejora" | "cambio";

type Release = {
  version: string;
  date: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  color: string;
  changes: { kind: ChangeKind; text: string }[];
};

const kindStyles: Record<ChangeKind, { label: string; className: string }> = {
  nuevo: { label: "Nuevo", className: "bg-accent text-accent-foreground" },
  mejora: { label: "Mejora", className: "bg-tint text-accent" },
  cambio: { label: "Cambio", className: "bg-card-muted text-muted" },
};

const releases: Release[] = [
  {
    version: "0.6",
    date: "2026-10-01",
    title: "Un Revelo más pulido",
    summary:
      "Repasamos cada pantalla para que crear, subir y compartir se sienta más cómodo y coherente.",
    icon: Palette,
    color: "bg-mint",
    changes: [
      {
        kind: "mejora",
        text: "Nuevo diseño para las pantallas de entrar y crear cuenta.",
      },
      {
        kind: "mejora",
        text: "Formularios de álbum y subida de fotos más claros, con mejor respuesta mientras se envían.",
      },
      {
        kind: "mejora",
        text: "Galería del panel y botones de compartir y eliminar renovados.",
      },
      {
        kind: "nuevo",
        text: "Prueba un álbum de ejemplo desde la portada: copia el enlace y ábrelo en otra pestaña.",
      },
    ],
  },
  {
    version: "0.5",
    date: "2026-10-01",
    title: "Modo revelar",
    summary:
      "Las fotos de un álbum compartido pueden aparecer ocultas y revelarse al tocarlas, como en el cuarto oscuro.",
    icon: Sparkles,
    color: "bg-rose",
    changes: [
      {
        kind: "nuevo",
        text: "Activa el modo revelar desde el panel de cada álbum con un solo interruptor.",
      },
      {
        kind: "nuevo",
        text: "Icono propio y manifiesto web: añade Revelo a la pantalla de inicio de tu móvil.",
      },
      {
        kind: "mejora",
        text: "Portada, Cómo funciona y Características rediseñadas con fotos reales.",
      },
    ],
  },
  {
    version: "0.4",
    date: "2026-09-18",
    title: "Edita tus álbumes",
    summary:
      "Más control sobre cada álbum una vez creado, y una web más fácil de recorrer.",
    icon: FolderHeart,
    color: "bg-sun",
    changes: [
      {
        kind: "nuevo",
        text: "Cambia el título y la descripción de un álbum sin perder su enlace.",
      },
      {
        kind: "mejora",
        text: "Nueva galería de fotos en el panel, con borrado directo desde cada foto.",
      },
      {
        kind: "nuevo",
        text: "Pie de página con accesos a las secciones principales.",
      },
    ],
  },
  {
    version: "0.3",
    date: "2026-09-16",
    title: "Enlaces más cortos",
    summary:
      "Los álbumes compartidos ahora viven en una dirección más limpia y cargan las fotos de forma segura.",
    icon: Share2,
    color: "bg-lilac",
    changes: [
      {
        kind: "cambio",
        text: "Los enlaces compartidos pasan de /a/… a una dirección directa, más fácil de enviar.",
      },
      {
        kind: "mejora",
        text: "Las fotos de los álbumes compartidos se sirven de forma segura sin exponer tu almacenamiento.",
      },
      {
        kind: "mejora",
        text: "Menú de cuenta más claro en la barra de navegación.",
      },
    ],
  },
  {
    version: "0.2",
    date: "2026-09-14",
    title: "Álbumes y enlaces para compartir",
    summary:
      "El corazón de Revelo: crea álbumes, sube tus fotos y compártelas con un enlace de solo lectura.",
    icon: Images,
    color: "bg-mint",
    changes: [
      { kind: "nuevo", text: "Crea álbumes privados con título y descripción." },
      { kind: "nuevo", text: "Sube varias fotos a la vez a cada álbum." },
      {
        kind: "nuevo",
        text: "Enlace público único por álbum, sin que tus invitados necesiten cuenta.",
      },
      { kind: "nuevo", text: "Elimina fotos o álbumes completos cuando quieras." },
    ],
  },
  {
    version: "0.1",
    date: "2026-09-14",
    title: "Hola, Revelo",
    summary: "Primera versión: tu cuenta y una casa para tus recuerdos.",
    icon: UserRound,
    color: "bg-sun",
    changes: [
      { kind: "nuevo", text: "Registro e inicio de sesión con email." },
      { kind: "nuevo", text: "Panel personal para tus álbumes." },
      { kind: "nuevo", text: "Tema claro y oscuro." },
      {
        kind: "nuevo",
        text: "Páginas de Cómo funciona y Características.",
      },
    ],
  },
];

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function NovedadesPage() {
  return (
    <div>
      <PageHero
        eyebrow={<Eyebrow icon={History}>Novedades</Eyebrow>}
        title={
          <>
            Lo último que hemos <Accent>revelado</Accent>
          </>
        }
        description="Cada versión de Revelo, con lo que cambia para ti y para quienes ven tus álbumes."
      />

      <section className="px-6 py-24 sm:py-32">
        <ol className="relative mx-auto flex w-full max-w-4xl flex-col gap-16 sm:gap-20">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.6875rem] w-px bg-border sm:left-[11.6875rem]"
          />

          {releases.map((release, i) => (
            <li
              key={release.version}
              className="relative grid gap-6 pl-20 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:pl-0"
            >
              <div className="flex flex-col gap-1 sm:pt-3 sm:text-right">
                <span className="font-display text-4xl leading-none text-accent italic">
                  v{release.version}
                </span>
                <time dateTime={release.date} className="text-xs text-muted">
                  {dateFormatter.format(new Date(release.date))}
                </time>
                {i === 0 && (
                  <span className="mt-1 self-start rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-accent sm:self-end">
                    Actual
                  </span>
                )}
              </div>

              <span
                className={`absolute top-0 left-0 flex size-14 items-center justify-center rounded-2xl text-ink shadow-lg ring-4 ring-background sm:left-40 ${release.color}`}
              >
                <release.icon className="size-6" strokeWidth={1.75} />
              </span>

              <article className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:ml-14 sm:p-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    {release.title}
                  </h2>
                  <p className="text-muted">{release.summary}</p>
                </div>
                <ul className="flex flex-col gap-3 border-t border-border pt-5">
                  {release.changes.map((change) => (
                    <li key={change.text} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 w-16 shrink-0 rounded-full py-0.5 text-center text-[0.65rem] font-medium uppercase tracking-wide ${kindStyles[change.kind].className}`}
                      >
                        {kindStyles[change.kind].label}
                      </span>
                      <span className="leading-relaxed">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <CtaBanner />
    </div>
  );
}
