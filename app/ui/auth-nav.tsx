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
          className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-80"
        >
          Mi cuenta
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="hidden font-medium transition-colors hover:text-muted sm:block"
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
