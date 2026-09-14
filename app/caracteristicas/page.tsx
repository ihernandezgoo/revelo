import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Lock, LucideIcon, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Características — Revelo",
  description:
    "Álbumes privados, enlaces de solo lectura y acceso sin cuenta para tus invitados.",
};

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Álbumes privados",
    description:
      "Tus fotos solo son visibles para ti hasta que compartes el enlace. Nadie más puede verlas mientras tanto.",
    icon: Lock,
  },
  {
    title: "Enlace de solo lectura",
    description:
      "Quien recibe el enlace puede ver el álbum, pero no editarlo ni borrarlo. El control siempre es tuyo.",
    icon: Link2,
  },
  {
    title: "Sin cuenta necesaria",
    description:
      "Tus invitados abren el álbum directamente desde el enlace, sin registrarse en Revelo.",
    icon: Users,
  },
];

export default function CaracteristicasPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Pensado para compartir con calma
        </h1>
        <p className="mt-4 text-lg text-muted">
          Lo justo para guardar tus fotos y revelarlas a quien tú elijas.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-accent/10">
              <feature.icon className="size-6 text-accent" strokeWidth={1.75} />
            </div>
            <h2 className="mt-4 text-lg font-medium">{feature.title}</h2>
            <p className="mt-2 text-muted">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center">
        <h2 className="max-w-lg text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Tus fotos merecen ser reveladas
        </h2>
        <p className="max-w-md text-balance text-muted">
          Crea tu cuenta gratis y comparte tu primer álbum en minutos.
        </p>
        <Link
          href="/registro"
          className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Empezar ahora
        </Link>
      </div>
    </div>
  );
}
