import type { Metadata } from "next";
import Link from "next/link";
import { RevealMark } from "../ui/reveal-mark";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Revelo",
  description: "Entra a tu cuenta de Revelo para ver y gestionar tus álbumes.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 sm:py-28">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
        <RevealMark className="size-7 text-accent" />
        <span className="text-xl">Revelo</span>
      </Link>

      <div className="mt-8 w-full rounded-3xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Entra a tu cuenta
        </h1>
        <p className="mt-2 text-muted">
          Revela tus álbumes y sigue compartiendo tus momentos.
        </p>

        <LoginForm />
      </div>

      <p className="mt-6 text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-foreground hover:text-accent">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
