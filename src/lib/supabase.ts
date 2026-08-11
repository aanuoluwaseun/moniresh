import { createClient } from "@supabase/supabase-js";

// Client for browser (anon, RLS enforced)
export const supabaseBrowser = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    // During build or without env, return a stub that warns
    console.warn("Supabase env not configured - using local mock mode");
    return null as unknown as ReturnType<typeof createClient>;
  }
  return createClient(url, anon);
};

// Server client with service role (never expose to client)
export const supabaseServer = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) return null as unknown as ReturnType<typeof createClient>;
  return createClient(url, service, { auth: { persistSession: false } });
};
