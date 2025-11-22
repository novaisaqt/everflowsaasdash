import { createClient } from "@supabase/supabase-js"

// Only read envs inside functions (prevents Vercel crash)
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    throw new Error("Supabase public env vars not set")
  }

  return createClient(url, anon)
}

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !service) {
    throw new Error("Supabase admin env vars not set")
  }

  return createClient(url, service, {
    auth: {
      persistSession: false
    }
  })
}
