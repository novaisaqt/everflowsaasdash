// lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Shared type alias so you can import `TypedSupabaseClient`
 * instead of `SupabaseClient` everywhere else if you want.
 */
export type TypedSupabaseClient = SupabaseClient;

// ---- ENV VALIDATION -------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fail fast if anything critical is missing (better than silent nulls)
if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Set it in your Vercel environment variables."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Set it in your Vercel environment variables."
  );
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your Vercel environment variables."
  );
}

// ---- CLIENTS --------------------------------------------------------

/**
 * Standard client – for user-side / non-privileged operations.
 * Safe to use in:
 *   - client components
 *   - server components
 *   - route handlers
 * as long as you are not doing privileged actions.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

/**
 * Admin client – SERVICE ROLE KEY.
 * ❗ Use ONLY on the server (server components, route handlers, cron jobs).
 * Never import this into a `"use client"` component.
 *
 * This is what you should use for:
 *   - multi-tenant admin stuff
 *   - back-office dashboards
 *   - anything that needs RLS bypass
 */
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

/**
 * Optional helpers if you ever want fresh instances instead of the shared ones.
 * (You don't *have* to use these, but they’re here in case.)
 */
export const createSupabaseClient = (): SupabaseClient =>
  createClient(supabaseUrl, supabaseAnonKey);

export const createSupabaseAdminClient = (): SupabaseClient =>
  createClient(supabaseUrl, supabaseServiceRoleKey);
