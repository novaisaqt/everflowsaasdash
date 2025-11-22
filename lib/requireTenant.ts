import { getSupabaseAdmin } from "@/lib/supabase"

/**
 * Ensures a tenant exists before allowing access.
 * Role is currently logical only, but future-ready.
 */
export async function requireTenant(
  role: "admin" | "manager" | "user" | "owner"
) {
  const supabaseAdmin = getSupabaseAdmin()

  const { data, error } = await supabaseAdmin
    .from("tenants")
    .select("*")
    .limit(1)
    .single()

  if (error || !data) {
    console.error("Tenant error:", error)
    throw new Error("No tenant found in system")
  }

  return {
    role,
    tenantId: data.id,
    tenant: data,
  }
}
