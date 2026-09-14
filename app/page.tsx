import Link from "next/link";
import { RevealMark } from "./ui/reveal-mark";

export default function Home() {
  return (
    <div>
      <Hero />
      <SocialProof />
      <CallToAction />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted">
          <RevealMark className="size-4 text-accent" />
          Álbumes online, listos para compartir
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Revela tus fotos. Revela tus momentos.
        </h1>

        <p className="max-w-xl text-balance text-lg text-muted">
          Organiza tus fotos en álbumes privados y compártelos con un enlace
          único. Quien lo recibe los ve al instante, sin crear cuenta.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/registro"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Crear mi álbum gratis
          </Link>
          <Link
            href="/como-funciona"
            className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-card"
          >
            Ver cómo funciona
          </Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "100% privado", label: "hasta que tú decidas compartir" },
    { value: "1 enlace", label: "para cada álbum" },
    { value: "0 registros", label: "requeridos para ver tus fotos" },
  ];

  return (
    <section className="border-y border-border bg-card-muted">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.value}>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center">
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
    </section>
  );
}
