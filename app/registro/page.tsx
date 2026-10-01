import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { AuthLink, AuthShell } from "../ui/auth-shell";
import { Accent, Eyebrow } from "../ui/marketing";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Crear cuenta — Revelo",
  description: "Crea tu cuenta gratis en Revelo y empieza a compartir tus álbumes.",
};

export default function RegistroPage() {
  return (
    <AuthShell
      eyebrow={<Eyebrow icon={Sparkles}>Gratis, en un minuto</Eyebrow>}
      photos={["familyBeach", "balloons", "beach"]}
      title={
        <>
          Empieza a <Accent>revelar</Accent> tus fotos
        </>
      }
      description="Crea tu cuenta y comparte tu primer álbum hoy mismo."
      footer={
        <div className="flex flex-col gap-4">
          <p>
            ¿Ya tienes cuenta? <AuthLink href="/login">Entra</AuthLink>
          </p>
          <p className="text-xs">
            Al crear una cuenta aceptas los términos y la política de
            privacidad de Revelo.
          </p>
        </div>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
