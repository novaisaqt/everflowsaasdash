// src/app/(app)/analytics/page.tsx
import AppShell from '@/components/layout/app-shell';
import { requireTenant } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase';

export default async function AnalyticsPage() {
  // If you want tenant-specific analytics: use requireTenant instead
  // For global platform analytics, requirePlatformAdmin:
  await requirePlatformAdmin();

  const [
    tenantsRes,
    candidatesRes,
    oppsRes,
    hotCandidatesRes,
    pipelineCountsRes,
  ] = await Promise.all([
    supabaseAdmin.from('tenants').select('id'),
    supabaseAdmin.from('candidates').select('id, tenant_id, status'),
    supabaseAdmin.from('opportunities').select('id, tenant_id, stage_id'),
    supabaseAdmin
      .from('cv_analysis')
      .select('candidate_id, fit_score')
      .gte('fit_score', 80),
    supabaseAdmin
      .from('candidate_master')
      .select('pipeline_stage'),
  ]);

  const totalTenants = tenantsRes.data?.length ?? 0;
  const totalCandidates = candidatesRes.data?.length ?? 0;
  const totalOpps = oppsRes.data?.length ?? 0;
  const hotCandidates = hotCandidatesRes.data?.length ?? 0;

  const stageCounts: Record<string, number> = {};
  (pipelineCountsRes.data ?? []).forEach((row: any) => {
    const stage = row.pipeline_stage ?? 'Unknown';
    stageCounts[stage] = (stageCounts[stage] ?? 0) + 1;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Platform analytics</h1>
          <p className="text-sm text-neutral-400">
            High-level view across all tenants, candidates and pipelines.
          </p>
        </div>

        {/* Top stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Tenants" value={totalTenants.toString()} />
          <StatCard label="Candidates" value={totalCandidates.toString()} />
          <StatCard label="Opportunities" value={totalOpps.toString()} />
          <StatCard label="High-fit candidates (80+)" value={hotCandidates.toString()} />
        </div>

        {/* Pipeline distribution */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium">Pipeline distribution</h2>
          <div className="rounded-2xl border border-neutral-800 p-4 flex flex-wrap gap-3">
            {Object.keys(stageCounts).length === 0 && (
              <p className="text-xs text-neutral-500">
                No pipeline data yet.
              </p>
            )}
            {Object.entries(stageCounts).map(([stage, count]) => (
              <div
                key={stage}
                className="rounded-xl border border-neutral-800 px-3 py-2 text-xs flex items-center justify-between gap-4"
              >
                <span className="text-neutral-300">{stage}</span>
                <span className="text-neutral-100 font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 p-4 flex flex-col gap-1">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  );
}
