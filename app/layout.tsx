import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { AuthNav } from "./ui/auth-nav";
import { InlineScript } from "./ui/inline-script";
import { RevealMark } from "./ui/reveal-mark";
import { SiteFooter } from "./ui/site-footer";
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
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full bg-card-muted px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <RevealMark className="size-5" />
          Revelo
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium sm:flex">
          <Link href="/como-funciona" className="transition-colors hover:text-muted">
            Cómo funciona
          </Link>
          <Link href="/caracteristicas" className="transition-colors hover:text-muted">
            Características
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Suspense fallback={<AuthNavFallback />}>
            <AuthNav />
          </Suspense>
          <ThemeToggle />
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
        className="hidden font-medium transition-colors hover:text-muted sm:block"
      >
        Entrar
      </Link>
      <Link
        href="/registro"
        className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-80"
      >
        Crear cuenta
      </Link>
    </>
  );
}

