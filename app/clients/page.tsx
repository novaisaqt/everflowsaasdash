import AppShell from "@/components/layout/app-shell"
import { requireTenant } from "@/lib/requireTenant"
import { getSupabaseAdmin } from "@/lib/supabase"
import ViewCVModal from "@/components/ViewCVModal"
import CandidateTimeline from "@/components/CandidateTimeline"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  try {
    const tenant = await requireTenant("admin")
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

