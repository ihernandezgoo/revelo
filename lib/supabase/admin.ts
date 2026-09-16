import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con service_role: bypassa RLS. Nunca exponer al navegador.
// Usar solo después de validar la autorización por otra vía (ej. share_token
// ya verificado vía get_shared_album) — nunca a partir de input de un cliente
// no autenticado sin ese paso previo.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
