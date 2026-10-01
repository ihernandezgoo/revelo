import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  Link2,
  Lock,
  MonitorSmartphone,
  PencilLine,
  Sparkles,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { MomentsShowcase } from "../ui/moments-showcase";
import {
  Accent,
  CtaBanner,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "../ui/marketing";
import { photos } from "../ui/photos";

export const metadata: Metadata = {
  title: "Características — Revelo",
  description:
    "Álbumes privados, enlaces de solo lectura, modo revelar y acceso sin cuenta para tus invitados.",
};

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const highlights: (Feature & { color: string; points: string[] })[] = [
  {
    title: "Álbumes privados",
    description:
      "Tus fotos solo son visibles para ti hasta que compartes el enlace.",
    icon: Lock,
    color: "bg-rose",
    points: ["Privados por defecto", "Solo tú editas", "Tú decides cuándo"],
  },
  {
    title: "Enlace de solo lectura",
    description:
      "Quien recibe el enlace puede ver el álbum, pero no editarlo ni borrarlo.",
    icon: Link2,
    color: "bg-sun",
    points: ["Un enlace por álbum", "Copia con un toque", "El control es tuyo"],
  },
  {
    title: "Sin cuenta necesaria",
    description:
      "Tus invitados abren el álbum directamente, sin registrarse en Revelo.",
    icon: Users,
    color: "bg-lilac",
    points: ["Acceso instantáneo", "Sin apps", "Cualquier navegador"],
  },
];

const extras: Feature[] = [
  {
    title: "Modo revelar",
    description:
      "Fotos veladas que cada visitante descubre una a una. Su progreso se guarda en su navegador.",
    icon: Sparkles,
  },
  {
    title: "Edita cuando quieras",
    description:
      "Cambia el título y la descripción del álbum sin que cambie el enlace.",
    icon: PencilLine,
  },
  {
    title: "Borra en un clic",
    description:
      "Elimina fotos sueltas, varias a la vez o el álbum entero; el enlace deja de funcionar al instante.",
    icon: Trash2,
  },
  {
    title: "En cualquier pantalla",
    description:
      "La galería se adapta al móvil, la tablet o el ordenador, con modo claro y oscuro.",
    icon: MonitorSmartphone,
  },
];

export default function CaracteristicasPage() {
  return (
    <div>
      <PageHero
        eyebrow={<Eyebrow icon={Sparkles}>Detalles</Eyebrow>}
        title={
          <>
            Pensado para compartir con <Accent>calma</Accent>
          </>
        }
        description="Lo justo para guardar tus fotos y revelarlas a quien tú elijas. Nada de ruido, nada de anuncios entre tus recuerdos."
      />

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-3">
          {highlights.map((feature) => (
            <div
              key={feature.title}
              className={`flex flex-col gap-6 rounded-[2rem] p-8 text-ink transition-transform hover:-translate-y-1 ${feature.color}`}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-paper">
                <feature.icon className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-ink/75">{feature.description}</p>
              </div>
              <ul className="mt-auto flex flex-col gap-2 border-t border-ink/15 pt-5 text-sm">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0" strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card px-6 py-24 sm:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
          <SectionHeading
            eyebrow={<Eyebrow icon={Sparkles}>Nuevo</Eyebrow>}
            title={
              <>
                Modo <Accent>revelar</Accent>
              </>
            }
            description="Como en el cuarto oscuro: las fotos aparecen veladas y tus invitados las descubren una a una. Actívalo y toca las fotos para probarlo."
          />
          <MomentsShowcase />
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              align="left"
              title={
                <>
                  Y los <Accent>pequeños</Accent> detalles
                </>
              }
            />
            <div className="grid gap-8 sm:grid-cols-2">
              {extras.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-tint text-accent">
                    <feature.icon className="size-4" />
                  </span>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card-muted">
            <Image
              src={photos.road.src}
              alt={photos.road.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
