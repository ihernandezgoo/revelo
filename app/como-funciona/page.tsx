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
    <div>
      <div className="mx-auto w-full max-w-7xl border-b border-border px-6 py-20 sm:py-28">
        <p className="text-xs uppercase tracking-widest text-muted">Guía</p>
        <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          Cómo funciona
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg text-muted">
          Tres pasos entre tus fotos guardadas y las personas con quienes
          quieres compartirlas.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col gap-4 px-6 py-14 sm:px-10 ${
              i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <step.icon className="size-6" strokeWidth={1.5} />
            <span className="mt-2 font-mono text-sm text-muted">
              {step.number}
            </span>
            <h2 className="text-2xl font-medium tracking-tight">{step.title}</h2>
            <p className="text-muted">{step.description}</p>
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
