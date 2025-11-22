import AppShell from "@/components/layout/app-shell"
import { requireTenant } from "@/lib/requireTenant"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  try {
    // Lock this page to admin users
    const tenant = await requireTenant("admin")

    // Lazy-load Supabase (build-safe)
    const supabaseAdmin = getSupabaseAdmin()

    const { data: candidates, error } = await supabaseAdmin
      .from("candidate_master")
      .select("full_name, fit_score, pipeline_stage")
      .eq("tenant_id", tenant.tenantId)
      .order("fit_score", { ascending: false })
      .limit(50)

    if (error) {
      console.error("Analytics query error:", error)
      throw new Error("Failed to load analytics data")
    }

    return (
      <AppShell>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Analytics</h1>

          {candidates && candidates.length > 0 ? (
            <div className="grid gap-4">
              {candidates.map((c, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow"
                >
                  <p><strong>Name:</strong> {c.full_name}</p>
                  <p><strong>Fit Score:</strong> {c.fit_score ?? "N/A"}</p>
                  <p><strong>Stage:</strong> {c.pipeline_stage}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No analytics data found for this tenant.</p>
          )}
        </div>
      </AppShell>
    )
  } catch (error: any) {
    console.error("Analytics page error:", error)

    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <p className="text-red-500">
          {error?.message || "Error loading analytics page"}
        </p>
      </div>
    )
  }
}
