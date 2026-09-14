import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { AuthNav } from "./ui/auth-nav";
import { InlineScript } from "./ui/inline-script";
import { RevealMark } from "./ui/reveal-mark";
import { ThemeToggle } from "./ui/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revelo — Revela tus fotos, revela tus momentos",
  description:
    "Crea álbumes de fotos online y compártelos con un enlace público. Quien lo recibe no necesita crear cuenta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript
          html={`(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <RevealMark className="size-6 text-accent" />
          <span className="text-lg">Revelo</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <Link href="/como-funciona" className="transition-colors hover:text-foreground">
            Cómo funciona
          </Link>
          <Link href="/caracteristicas" className="transition-colors hover:text-foreground">
            Características
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          <Suspense fallback={<AuthNavFallback />}>
            <AuthNav />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}

function AuthNavFallback() {
  return (
    <>
      <Link
        href="/login"
        className="hidden text-muted transition-colors hover:text-foreground sm:block"
      >
        Entrar
      </Link>
      <Link
        href="/registro"
        className="rounded-full bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Crear cuenta
      </Link>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2">
          <RevealMark className="size-4 text-accent" />
          <span>Revelo</span>
        </div>
        <p>© {new Date().getFullYear()} Revelo. Tus recuerdos, a la luz.</p>
      </div>
    </footer>
  );
}
