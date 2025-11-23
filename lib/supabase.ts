import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://ogtlffswwinyxdppvqgv.supabase.co"

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_lf5ShsQSqbYEjrzkuCQOjQ_iPsrRcLu"

export const supabase = createClient(supabaseUrl, supabaseKey)
