import { supabaseAdmin } from "@/lib/supabase";

/**
 * Used to require a tenant based on role.
 * For now, this just grabs the first tenant row available
 * You can later extend this to look up by user, subdomain, etc.
 */
export async function requireTenant(role: "admin" | "manager" | "user") {
  const { data, error } = await supabaseAdmin
    .from("tenants")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Tenant error:", error);
    throw new Error("No tenant found");
  }

  return {
    role,
    tenantId: data.id,
    tenant: data
  };
}
