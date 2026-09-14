import type { Metadata } from "next";
import Link from "next/link";
import { RevealMark } from "../ui/reveal-mark";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Crear cuenta — Revelo",
  description: "Crea tu cuenta gratis en Revelo y empieza a compartir tus álbumes.",
};

export default function RegistroPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 sm:py-28">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
        <RevealMark className="size-7 text-accent" />
        <span className="text-xl">Revelo</span>
      </Link>

      <div className="mt-8 w-full rounded-3xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crea tu cuenta
        </h1>
        <p className="mt-2 text-muted">
          Gratis, en un minuto. Empieza a revelar tus fotos.
        </p>

        <SignupForm />

        <p className="mt-6 text-center text-xs text-muted">
          Al crear una cuenta aceptas los términos y la política de
          privacidad de Revelo.
        </p>
      </div>

      <p className="mt-6 text-sm text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-foreground hover:text-accent">
          Entra
        </Link>
      </p>
    </div>
  );
}
