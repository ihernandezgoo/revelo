import Link from "next/link";
import { RevealMark } from "./ui/reveal-mark";

export default function Home() {
  return (
    <div>
      <Hero />
      <SocialProof />
      <ShowcaseStrip />
      <CallToAction />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
          <RevealMark className="size-4" />
          Álbumes online — listos para compartir
        </div>

        <h1 className="max-w-5xl text-balance text-6xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
          Revela tus fotos.
          <br />
          Revela tus momentos.
        </h1>

        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <p className="max-w-md text-balance text-lg text-muted">
            Organiza tus fotos en álbumes privados y compártelos con un
            enlace único. Quien lo recibe los ve al instante, sin crear
            cuenta.
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/registro"
              className="border border-foreground bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wide text-background transition-opacity hover:opacity-80"
            >
              Crear mi álbum gratis
            </Link>
            <Link
              href="/como-funciona"
              className="border border-border px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-foreground"
            >
              Ver cómo funciona
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "100%", label: "Privado hasta que tú decidas compartir" },
    { value: "1", label: "Enlace único para cada álbum" },
    { value: "0", label: "Registros requeridos para ver tus fotos" },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            className={`flex flex-col gap-3 px-6 py-12 sm:px-10 ${
              i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <p className="text-5xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseStrip() {
  const items = [
    {
      number: "01",
      title: "Sube tus fotos",
      description: "Crea un álbum y arrastra tus fotos favoritas.",
    },
    {
      number: "02",
      title: "Genera tu enlace",
      description: "Cada álbum tiene un enlace único de solo lectura.",
    },
    {
      number: "03",
      title: "Comparte el momento",
      description: "Se ve sin registro, en cualquier dispositivo.",
    },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto flex w-full max-w-7xl items-baseline justify-between px-6 pt-16">
        <h2 className="text-sm uppercase tracking-widest text-muted">
          Cómo funciona
        </h2>
        <Link
          href="/como-funciona"
          className="text-sm uppercase tracking-widest transition-colors hover:text-muted"
        >
          Ver más →
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.number}
            className={`flex flex-col gap-4 px-6 py-12 sm:px-10 ${
              i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <span className="font-mono text-sm text-muted">{item.number}</span>
            <h3 className="text-2xl font-medium tracking-tight">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-28">
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
    </section>
  );
}
