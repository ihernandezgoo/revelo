"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { login } from "@/app/actions/auth";
import {
  errorClass,
  fieldClass,
  fieldIconClass,
  primaryButtonClass,
} from "@/app/ui/form-styles";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className={fieldIconClass} />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tú@ejemplo.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <Link
            href="/recuperar"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ¿La olvidaste?
          </Link>
        </div>
        <div className="relative">
          <Lock className={fieldIconClass} />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>
      </div>

      {state?.error && (
        <p role="alert" className={errorClass}>
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className={`mt-2 ${primaryButtonClass}`}>
        {pending ? "Entrando…" : "Entrar"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
