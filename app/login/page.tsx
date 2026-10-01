import type { Metadata } from "next";
import { LogIn } from "lucide-react";
import { AuthLink, AuthShell } from "../ui/auth-shell";
import { Accent, Eyebrow } from "../ui/marketing";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Revelo",
  description: "Entra a tu cuenta de Revelo para ver y gestionar tus álbumes.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow={<Eyebrow icon={LogIn}>Hola de nuevo</Eyebrow>}
      photos={["hands", "boat", "laughing"]}
      title={
        <>
          Entra a tu <Accent>cuarto oscuro</Accent>
        </>
      }
      description="Revela tus álbumes y sigue compartiendo tus momentos."
      footer={
        <>
          ¿No tienes cuenta? <AuthLink href="/registro">Regístrate gratis</AuthLink>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
