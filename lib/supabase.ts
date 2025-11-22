import { createClient } from "@supabase/supabase-js"

/**
 * IMPORTANT: Do NOT throw errors at top-level for env vars.
 * Next/Vercel sometimes evaluates this file at build-time.
 * We must only access env inside functions.
 */

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    throw new Error("Supabase client env vars missing")
  }

  return createClient(url, anon)
}

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !service) {
    throw new Error("Supabase admin env vars missing")
  }

  return createClient(url, service)
}
