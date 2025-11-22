import { createClient, SupabaseClient } from "@supabase/supabase-js"

/**
 * We DO NOT read env variables or create clients at the top-level.
 * This prevents Next.js / Vercel from crashing at build-time.
 */

/**
 * Standard (public) Supabase client
 * For client components and non-admin usage
 */
export function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    throw new Error("Supabase client env vars missing")
  }

  return createClient(url, anon)
}

/**
 * Admin Supabase client (SERVICE ROLE)
 * For server use only.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !service) {
    throw new Error("Supabase admin env vars missing")
  }

  return createClient(url, service)
}
