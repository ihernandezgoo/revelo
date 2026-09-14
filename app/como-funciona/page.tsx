import type { Metadata } from "next";
import Link from "next/link";
import { LucideIcon, Share2, Sparkles, Upload } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo funciona — Revelo",
  description:
    "Sube tus fotos, genera un enlace único y compártelo. Así de simple funciona Revelo.",
};

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Sube tus fotos",
    description:
      "Crea un álbum y arrastra tus fotos favoritas. Organízalas como quieras, en el orden que prefieras.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Genera tu enlace",
    description:
      "Cada álbum tiene un enlace único de solo lectura, listo para compartir en el momento que decidas.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Comparte el momento",
    description:
      "Envíalo a quien quieras por el canal que prefieras. Podrán ver el álbum sin registrarse en Revelo.",
    icon: Share2,
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Cómo funciona
        </h1>
        <p className="mt-4 text-lg text-muted">
          Tres pasos entre tus fotos guardadas y las personas con quienes
          quieres compartirlas.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent/10">
              <step.icon className="size-6 text-accent" strokeWidth={1.75} />
            </div>
            <span className="mt-6 block text-sm font-mono text-accent">
              {step.number}
            </span>
            <h2 className="mt-2 text-xl font-medium">{step.title}</h2>
            <p className="mt-2 text-muted">{step.description}</p>
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
