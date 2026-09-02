import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ── SETUP ────────────────────────────────────────────────────────────────
// 1. Create a free project at https://supabase.com
// 2. In Vercel → Project Settings → Environment Variables, add:
//      NEXT_PUBLIC_SUPABASE_URL      = https://xxxx.supabase.co
//      NEXT_PUBLIC_SUPABASE_ANON_KEY = your anon/public key
// 3. In Supabase → Authentication → Providers, make sure Email is enabled,
//    then Authentication → Users → Add user, to create YOUR admin login
//    (this is the email + password you'll use on /admin).
// 4. Run the SQL in supabase/schema.sql (see that file) to create the
//    tables the dashboard reads and writes to.
// ────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
