import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Share2, Sparkles, Upload, type LucideIcon } from "lucide-react";
import {
  Accent,
  CtaBanner,
  Eyebrow,
  Faq,
  PageHero,
  SectionHeading,
} from "../ui/marketing";
import { photos, type PhotoKey } from "../ui/photos";

export const metadata: Metadata = {
  title: "Cómo funciona — Revelo",
  description:
    "Sube tus fotos, genera un enlace único y compártelo. Así de simple funciona Revelo.",
};

type Step = {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  photo: PhotoKey;
  color: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Sube tus fotos",
    description:
      "Crea un álbum, ponle nombre y arrastra tus fotos favoritas. Puedes subir muchas a la vez.",
    details: ["Subida múltiple","Título y descripción editables", "Privado desde el primer momento"],
    icon: Upload,
    photo: "prints",
    color: "bg-rose",
  },
  {
    number: "02",
    title: "Genera tu enlace",
    description:
      "Cada álbum tiene un enlace único de solo lectura, listo para compartir en el momento que decidas.",
    details: ["Cópialo con un toque", "Solo lectura para los invitados", "Activa el modo revelar si quieres"],
    icon: Sparkles,
    photo: "wedding",
    color: "bg-sun",
  },
  {
    number: "03",
    title: "Comparte el momento",
    description:
      "Envíalo por el canal que prefieras. Quien lo abra verá el álbum sin registrarse en Revelo.",
    details: ["WhatsApp, email, redes…", "Cualquier dispositivo", "Sin apps que instalar"],
    icon: Share2,
    photo: "sunsetGroup",
    color: "bg-lilac",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div>
      <PageHero
        eyebrow={<Eyebrow icon={Compass}>Guía</Eyebrow>}
        title={
          <>
            Tres pasos para <Accent>revelar</Accent> tus fotos
          </>
        }
        description="Entre tus fotos guardadas y las personas con quienes quieres compartirlas solo hay un álbum y un enlace."
      />

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 sm:gap-32">
          {steps.map((step, i) => (
            <article
              key={step.number}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div
                className={`relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-card-muted ${
                  i % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={photos[step.photo].src}
                  alt={photos[step.photo].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span
                  className={`absolute top-5 left-5 flex size-14 items-center justify-center rounded-2xl text-ink shadow-lg ${step.color}`}
                >
                  <step.icon className="size-6" strokeWidth={1.75} />
                </span>
              </div>

              <div className="flex flex-col items-start gap-6">
                <span className="font-display text-7xl leading-none text-accent italic sm:text-8xl">
                  {step.number}
                </span>
                <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
                  {step.title}
                </h2>
                <p className="max-w-md text-lg text-muted">{step.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card px-6 pt-24 sm:pt-32">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            align="left"
            title={
              <>
                Dudas <Accent>frecuentes</Accent>
              </>
            }
            description="Lo básico para empezar con buen pie."
          />
          <Faq
            items={[
              {
                question: "¿Puedo cambiar el título del álbum después?",
                answer:
                  "Sí. Desde tu panel puedes editar el título y la descripción cuando quieras, y el enlace sigue siendo el mismo.",
              },
              {
                question: "¿Qué pasa si elimino un álbum?",
                answer:
                  "Se borran sus fotos y el enlace deja de funcionar para todo el mundo al instante.",
              },
              {
                question: "¿Pueden mis invitados subir fotos?",
                answer:
                  "No. El enlace es de solo lectura: pueden ver el álbum, pero solo tú decides qué contiene.",
              },
            ]}
          />
        </div>
        <div className="h-24 sm:h-32" />
      </section>

      <CtaBanner />
    </div>
  );
}
