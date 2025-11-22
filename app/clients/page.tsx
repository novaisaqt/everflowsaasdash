import AppShell from "@/components/layout/app-shell"
import { requireTenant } from "@/lib/requireTenant"
import { getSupabaseAdmin } from "@/lib/supabase"
import ViewCVModal from "@/components/ViewCVModal"
import CandidateTimeline from "@/components/CandidateTimeline"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  // Ensure tenant + role
  const tenant = await requireTenant("admin")

  // Lazy-load Supabase (Vercel safe)
  const supabaseAdmin = getSupabaseAdmin()

  const { data: candidates, error } = await supabaseAdmin
    .from("candidate_master")
    .select("*")
    .eq("tenant_id", tenant.tenantId)
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    console.error("Clients query error:", error)
    throw new Error("Failed to load clients")
  }

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <span className="text-sm text-muted-foreground">
            {candidates?.length ?? 0} records
          </span>
        </div>

        {!candidates || candidates.length === 0 ? (
          <p className="text-muted-foreground">No candidates found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {candidates.map((c: any) => (
              <div
                key={c.candidate_id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <h3 className="font-semibold text-lg">
                  {c.full_name || "Unnamed Candidate"}
                </h3>

                <p className="text-sm text-gray-600">
                  {c.email || "No email"}
                </p>

                <p className="text-sm mt-2">
                  Fit Score:{" "}
                  <span className="font-bold">
                    {c.fit_score ?? "N/A"}
                  </span>
                </p>

                <p className="text-sm">
                  Stage:{" "}
                  <span className="font-semibold">
                    {c.pipeline_stage ?? "N/A"}
                  </span>
                </p>

                <div className="mt-4 flex gap-2">
                  <ViewCVModal candidate={c} />
                  <CandidateTimeline candidateId={c.candidate_id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
