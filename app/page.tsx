import Image from "next/image";
import {
  ArrowDown,
  Check,
  Images,
  Link2,
  Lock,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { MomentsShowcase } from "./ui/moments-showcase";
import {
  Accent,
  CtaBanner,
  Eyebrow,
  Faq,
  PrimaryButton,
  SafelightGlow,
  SecondaryButton,
  SectionHeading,
} from "./ui/marketing";
import { photos, type PhotoKey } from "./ui/photos";
import { RevealMark } from "./ui/reveal-mark";

export default function Home() {
  return (
    <div>
      <Hero />
      <MeetRevelo />
      <Moments />
      <ShareBanner />
      <Process />
      <Pillars />
      <Questions />
      <CtaBanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 overflow-hidden rounded-[2rem] bg-tint px-6 pt-20 pb-16 sm:px-14 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <SafelightGlow />

        <div className="relative flex flex-col items-start gap-8">
          <Eyebrow icon={Sparkles}>Álbumes online, listos para compartir</Eyebrow>

          <h1 className="text-balance text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">
            Revela tus fotos.
            <br />
            Revela tus <Accent>momentos.</Accent>
          </h1>

          <p className="max-w-md text-balance text-lg text-muted">
            Organiza tus fotos en álbumes privados y compártelos con un enlace
            único. Quien lo recibe los ve al instante, sin crear cuenta.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton href="/registro">Crear mi álbum gratis</PrimaryButton>
            <SecondaryButton href="/como-funciona">Ver cómo funciona</SecondaryButton>
          </div>

          <a
            href="#conoce-revelo"
            className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            Sigue bajando
            <ArrowDown className="size-3.5 animate-bounce" />
          </a>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}

const phoneGrid: { photo: PhotoKey; hidden?: boolean }[] = [
  { photo: "wedding" },
  { photo: "bouquet" },
  { photo: "sunsetGroup", hidden: true },
  { photo: "friends" },
  { photo: "lake", hidden: true },
  { photo: "mountains" },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[34rem] w-full max-w-md sm:h-[38rem]">
      {/* Teléfono */}
      <div className="absolute top-0 left-1/2 w-[17rem] -translate-x-1/2 rotate-6 rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-2xl shadow-accent/20 sm:w-[19rem]">
        <div className="overflow-hidden rounded-[2.1rem] bg-paper text-ink">
          <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-ink" />
            <span>100%</span>
          </div>

          <div className="flex flex-col gap-1 px-5 pt-5 pb-4">
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-ink/70">
              <RevealMark className="size-3 text-safelight" />
              Álbum compartido
            </span>
            <span className="text-lg leading-tight font-semibold">
              Boda de Ana y Luis
            </span>
            <span className="text-[11px] text-ink/60">48 fotos · 14 jun</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
            {phoneGrid.map(({ photo, hidden }, i) => (
              <div
                key={photo}
                className="relative aspect-square overflow-hidden rounded-xl bg-ink/5"
              >
                <Image
                  src={photos[photo].src}
                  alt=""
                  fill
                  sizes="9rem"
                  preload={i < 2}
                  className={`object-cover ${hidden ? "scale-110 blur-xl" : "animate-develop"}`}
                  style={hidden ? undefined : { animationDelay: `${300 + i * 220}ms` }}
                />
                {hidden && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/20 text-white">
                    <Sparkles className="size-4" />
                    <span className="text-[8px] font-semibold uppercase tracking-widest">
                      Toca para revelar
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Etiqueta flotante, como una pegatina */}
      <div className="absolute top-16 -left-2 flex -rotate-6 animate-float flex-col gap-3 rounded-2xl bg-rose p-4 text-ink shadow-xl sm:left-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-ink text-rose">
          <Sparkles className="size-4" />
        </span>
        <span className="font-display text-2xl leading-none italic">
          Toca para
          <br />
          revelar
        </span>
      </div>

      {/* Enlace copiado */}
      <div
        className="absolute right-0 bottom-6 flex animate-float items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4 shadow-xl sm:-right-4"
        style={{ animationDelay: "-3s" }}
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-mint text-ink">
          <Check className="size-4" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-semibold">Enlace copiado</span>
          <span className="font-mono text-[11px] text-muted">revelo.app/8f3c…a91</span>
        </span>
      </div>
    </div>
  );
}

function MeetRevelo() {
  return (
    <section id="conoce-revelo" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card-muted sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src={photos.prints.src}
            alt={photos.prints.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 text-sm font-medium backdrop-blur">
            <Lock className="size-4 text-accent" />
            Privado hasta que tú decidas
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow={<Eyebrow icon={Images}>Conoce Revelo</Eyebrow>}
            title={
              <>
                Un álbum, un enlace, <Accent>cero</Accent> complicaciones
              </>
            }
            description="Las fotos de los mejores días acaban perdidas entre chats, nubes y carpetas. Revelo las reúne en álbumes bonitos que compartes con un solo enlace, para que cualquiera los vea desde el móvil o el ordenador."
          />
          <Faq
            items={[
              {
                question: "¿Quién puede ver mis álbumes?",
                answer:
                  "Solo tú, hasta que compartes el enlace. Quien lo recibe puede ver el álbum, pero nunca editarlo ni borrar fotos.",
              },
              {
                question: "¿Mis invitados necesitan una cuenta?",
                answer:
                  "No. Abren el enlace y ven el álbum al instante, en cualquier dispositivo y sin registrarse.",
              },
              {
                question: "¿Qué es el modo revelar?",
                answer:
                  "Una opción por álbum que muestra las fotos veladas. Cada visitante las va descubriendo una a una, como en el cuarto oscuro.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Moments() {
  return (
    <section className="border-t border-border bg-card px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        <SectionHeading
          title={
            <>
              Un álbum para cada <Accent>momento</Accent>
            </>
          }
          description="Bodas, viajes, cumpleaños o un domingo cualquiera. Prueba cómo lo verán tus invitados."
        />
        <MomentsShowcase />
      </div>
    </section>
  );
}

function ShareBanner() {
  return (
    <section className="px-4">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-7xl overflow-hidden rounded-[2rem] sm:aspect-[21/9]">
        <Image
          src={photos.wedding.src}
          alt={photos.wedding.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:inset-x-10 sm:bottom-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Todo el día, en <span className="font-display italic">un enlace.</span>
          </p>

          <div className="flex items-center gap-3 rounded-2xl bg-card p-2 pl-4 text-foreground shadow-2xl">
            <Link2 className="size-4 shrink-0 text-accent" />
            <span className="truncate font-mono text-xs sm:text-sm">
              revelo.app/8f3c2a91
            </span>
            <span className="shrink-0 rounded-xl bg-accent px-4 py-2 text-xs font-medium text-accent-foreground">
              Copiar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  "Crea tu cuenta gratis con tu email.",
  "Crea un álbum y ponle nombre y descripción.",
  "Sube tus fotos favoritas, todas a la vez.",
  "Si quieres, activa el modo revelar para crear expectación.",
  "Copia el enlace único del álbum.",
  "Compártelo por WhatsApp, email o donde prefieras.",
];

function Process() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            title={
              <>
                Nuestro <Accent>proceso</Accent>
              </>
            }
            description="Diseñamos Revelo para que pasar de las fotos en tu móvil a un álbum compartido lleve minutos, no tardes enteras."
          />
          <ol className="flex flex-col gap-1">
            {processSteps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-card"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tint font-mono text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card-muted">
          <Image
            src={photos.street.src}
            alt={photos.street.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute top-5 right-5 flex -rotate-3 flex-col gap-1 rounded-2xl bg-sun p-4 text-ink shadow-xl">
            <span className="text-xs font-medium uppercase tracking-widest">
              Tiempo medio
            </span>
            <span className="font-display text-4xl leading-none italic">2 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const pillars: {
  icon: LucideIcon;
  title: string;
  stat: string;
  statLabel: string;
  color: string;
  points: string[];
}[] = [
  {
    icon: Lock,
    title: "Privado",
    stat: "100%",
    statLabel: "tuyo hasta que compartes",
    color: "bg-rose",
    points: [
      "Álbumes privados por defecto",
      "Solo tú subes, editas y borras",
      "Elimina un álbum cuando quieras",
    ],
  },
  {
    icon: Link2,
    title: "Enlace único",
    stat: "1",
    statLabel: "enlace por álbum",
    color: "bg-sun",
    points: [
      "Enlace de solo lectura",
      "Cópialo con un toque",
      "Funciona en cualquier dispositivo",
    ],
  },
  {
    icon: Users,
    title: "Sin cuenta",
    stat: "0",
    statLabel: "registros para tus invitados",
    color: "bg-lilac",
    points: [
      "Abren el álbum al instante",
      "Sin apps que descargar",
      "Modo revelar opcional",
    ],
  },
];

function Pillars() {
  return (
    <section className="border-y border-border bg-card px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        <SectionHeading
          title={
            <>
              Todo lo que necesitas, <Accent>nada</Accent> que sobre
            </>
          }
          description="Tres ideas sencillas guían cada detalle de Revelo."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`flex flex-col gap-8 rounded-[2rem] p-8 text-ink transition-transform hover:-translate-y-1 ${pillar.color} ${
                i === 1 ? "md:-translate-y-4 md:hover:-translate-y-5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper">
                  <pillar.icon className="size-4" />
                </span>
                <span className="text-xl font-medium">{pillar.title}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-7xl font-semibold tracking-tighter">
                  {pillar.stat}
                </span>
                <span className="text-sm text-ink/70">{pillar.statLabel}</span>
              </div>

              <ul className="flex flex-col gap-2.5 border-t border-ink/15 pt-6 text-sm">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0" strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="px-6 pt-24 sm:pt-32">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          align="left"
          title={
            <>
              ¿Más <Accent>preguntas?</Accent>
            </>
          }
          description="Lo que suelen preguntarnos antes de crear su primer álbum."
        />
        <Faq
          items={[
            {
              question: "¿Cuánto cuesta Revelo?",
              answer:
                "Crear tu cuenta y tus álbumes es gratis. Regístrate y comparte tu primer álbum en minutos.",
            },
            {
              question: "¿Puedo dejar de compartir un álbum?",
              answer:
                "Sí. Si eliminas el álbum, el enlace deja de funcionar al momento para todo el mundo.",
            },
            {
              question: "¿Cómo funciona el modo revelar?",
              answer:
                "Lo activas en cada álbum. Las fotos aparecen veladas y cada visitante las revela tocándolas; Revelo recuerda en su navegador cuáles ya ha descubierto.",
            },
            {
              question: "¿Desde qué dispositivos se ve el álbum?",
              answer:
                "Desde cualquier navegador moderno: móvil, tablet u ordenador. No hace falta instalar nada.",
            },
          ]}
        />
      </div>
    </section>
  );
}
