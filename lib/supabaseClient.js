import { createClient } from '@supabase/supabase-js';

// NEXT_PUBLIC_ vars are available both server-side and client-side.
// Plain SUPABASE_URL is server-only — fallback for API routes.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

// Use the real anon key for client-side auth; service role is server-only.
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

// Guard: don't crash if env vars are missing (e.g. during build)
export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
