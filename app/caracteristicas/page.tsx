import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Lock, LucideIcon, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Características — Revelo",
  description:
    "Álbumes privados, enlaces de solo lectura y acceso sin cuenta para tus invitados.",
};

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    number: "01",
    title: "Álbumes privados",
    description:
      "Tus fotos solo son visibles para ti hasta que compartes el enlace. Nadie más puede verlas mientras tanto.",
    icon: Lock,
  },
  {
    number: "02",
    title: "Enlace de solo lectura",
    description:
      "Quien recibe el enlace puede ver el álbum, pero no editarlo ni borrarlo. El control siempre es tuyo.",
    icon: Link2,
  },
  {
    number: "03",
    title: "Sin cuenta necesaria",
    description:
      "Tus invitados abren el álbum directamente desde el enlace, sin registrarse en Revelo.",
    icon: Users,
  },
];

export default function CaracteristicasPage() {
  return (
    <div>
      <div className="mx-auto w-full max-w-7xl border-b border-border px-6 py-20 sm:py-28">
        <p className="text-xs uppercase tracking-widest text-muted">Detalles</p>
        <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          Pensado para compartir con calma
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg text-muted">
          Lo justo para guardar tus fotos y revelarlas a quien tú elijas.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`flex flex-col gap-4 px-6 py-14 sm:px-10 ${
              i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <feature.icon className="size-6" strokeWidth={1.5} />
            <span className="mt-2 font-mono text-sm text-muted">
              {feature.number}
            </span>
            <h2 className="text-2xl font-medium tracking-tight">
              {feature.title}
            </h2>
            <p className="text-muted">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-28">
        <div className="flex flex-col items-start gap-8 border border-border px-8 py-16 sm:px-16 sm:py-24">
          <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Tus fotos merecen ser reveladas
          </h2>
          <p className="max-w-md text-balance text-muted">
            Crea tu cuenta gratis y comparte tu primer álbum en minutos.
          </p>
          <Link
            href="/registro"
            className="border border-foreground bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wide text-background transition-opacity hover:opacity-80"
          >
            Empezar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
