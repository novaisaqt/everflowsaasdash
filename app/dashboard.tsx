// src/app/(app)/dashboard/page.tsx
import AppShell from '@/components/layout/app-shell';
import { requireTenant } from '@/lib/auth';

export default async function DashboardPage() {
  const tenant = await requireTenant('viewer');

  // Later: fetch stats from Supabase (pipeline, candidates, etc.)
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-neutral-400">
            {tenant.tenantName} · Recruitment overview
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Active candidates" value="42" />
          <StatCard label="Open roles" value="11" />
          <StatCard label="Interviews this week" value="7" />
          <StatCard label="Offers out" value="3" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-800 p-4">
            <h2 className="text-sm font-medium mb-2">Pipeline snapshot</h2>
            <p className="text-xs text-neutral-400">
              TODO: show candidates per stage from Supabase.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-4">
            <h2 className="text-sm font-medium mb-2">Recent activity</h2>
            <p className="text-xs text-neutral-400">
              TODO: show activity feed from automations / n8n.
            </p>
          </div>
        </div>
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
