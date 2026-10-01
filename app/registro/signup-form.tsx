"use client";

import { useActionState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { signup } from "@/app/actions/auth";
import {
  errorClass,
  fieldClass,
  fieldIconClass,
  primaryButtonClass,
} from "@/app/ui/form-styles";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, null);

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre
        </label>
        <div className="relative">
          <User className={fieldIconClass} />
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </div>
      </div>

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
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <div className="relative">
          <Lock className={fieldIconClass} />
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
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
        {pending ? "Creando cuenta…" : "Crear cuenta"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
