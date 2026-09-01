import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

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

// Guard: validate URL is a real http/https URL before calling createClient.
// Supabase throws "Invalid supabaseUrl" if called with an empty string or
// a non-URL value, which crashes the build during static page generation.
const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const supabase =
  supabaseUrl && isValidUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
