import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export async function AuthNav() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-full bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Mi cuenta
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-2 font-medium transition-colors hover:bg-card"
          >
            Salir
          </button>
        </form>
      </div>
    );
  }

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
