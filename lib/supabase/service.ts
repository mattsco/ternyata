import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase « service role » — BYPASSE la RLS.
 * À n'importer QUE depuis des route handlers / server actions (jamais côté client :
 * `import "server-only"` lève sinon au build). Destiné au pipeline quotidien
 * (cron → upsert `bahasa_film_daily`). Lit `SUPABASE_SERVICE_ROLE_KEY` (env Vercel).
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service env manquante (URL / SERVICE_ROLE_KEY)");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
