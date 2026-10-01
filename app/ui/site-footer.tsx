"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RevealMark } from "./reveal-mark";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-10 px-6 py-16 text-sm sm:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
          <span className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <RevealMark className="size-7 text-accent" />
            Revelo
          </span>
          <p className="max-w-xs text-muted">Tus recuerdos, a la luz.</p>
        </div>

        <FooterColumn
          title="Producto"
          links={[
            { href: "/como-funciona", label: "Cómo funciona" },
            { href: "/caracteristicas", label: "Características" },
            { href: "/novedades", label: "Novedades", badge: "Nuevo" },
          ]}
        />
        <FooterColumn
          title="Cuenta"
          links={[
            { href: "/registro", label: "Crear cuenta" },
            { href: "/login", label: "Entrar" },
          ]}
        />
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-border px-6 py-6 text-xs uppercase tracking-wide text-muted">
        <span>© {new Date().getFullYear()} Revelo</span>
        <Link
          href="/novedades"
          className="group flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 normal-case tracking-normal text-foreground transition-colors hover:border-accent/40"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono">v0.6</span>
          <span className="text-muted transition-colors group-hover:text-accent">
            Ver novedades →
          </span>
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; badge?: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-wide text-muted">{title}</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 transition-colors hover:text-muted"
        >
          {link.label}
          {link.badge && (
            <span className="rounded-full bg-tint px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-accent">
              {link.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
