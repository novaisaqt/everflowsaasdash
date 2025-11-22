import { getSupabaseAdmin } from "@/lib/supabase"
import { requireTenant } from "@/lib/requireTenant"

export const dynamic = "force-dynamic"

export default async function BillingPage() {
  try {
    // Ensure correct tenant
    const tenant = await requireTenant("admin")

    // Lazy-load Supabase (prevents build-time crash)
    const supabaseAdmin = getSupabaseAdmin()

    const { data: billing, error } = await supabaseAdmin
      .from("billing_accounts")
      .select("*")
      .eq("tenant_id", tenant.tenant.id)
      .single()

    if (error) {
      console.error("Billing error:", error)
      throw new Error("Could not load billing info")
    }

    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Billing</h1>

        {billing ? (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(billing, null, 2)}
          </pre>
        ) : (
          <p>No billing account found for this tenant</p>
        )}
      </div>
    )
  } catch (error: any) {
    console.error("Billing page error:", error)

    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Billing</h1>
        <p className="text-red-500">
          {error?.message || "An error occurred while loading billing info"}
        </p>
      </div>
    )
  }
}
