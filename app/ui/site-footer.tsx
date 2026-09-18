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
          <span className="flex items-center gap-2 text-base font-semibold uppercase tracking-tight">
            <RevealMark className="size-4" />
            Revelo
          </span>
          <p className="max-w-xs text-muted">Tus recuerdos, a la luz.</p>
        </div>

        <FooterColumn
          title="Producto"
          links={[
            { href: "/como-funciona", label: "Cómo funciona" },
            { href: "/caracteristicas", label: "Características" },
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
        <span>Revela tus momentos</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-wide text-muted">{title}</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors hover:text-muted"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
