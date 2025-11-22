// src/app/(app)/pipeline/page.tsx
import AppShell from '@/components/layout/app-shell';
import { requireTenant } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export default async function PipelinePage() {
  const tenant = await requireTenant('manager');

  const { data: stages } = await supabaseAdmin
    .from('pipeline_stages')
    .select('*')
    .eq('tenant_id', tenant.tenantId)
    .order('position', { ascending: true });

  const { data: opps } = await supabaseAdmin
    .from('opportunities')
    .select('*, candidates(full_name)')
    .eq('tenant_id', tenant.tenantId);

  const grouped = (stages ?? []).map((s) => ({
    ...s,
    opps: (opps ?? []).filter((o) => o.stage_id === s.id),
  }));

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Pipeline</h1>
            <p className="text-sm text-neutral-400">
              Track candidates through each recruitment stage.
            </p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {grouped.map((stage) => (
            <div
              key={stage.id}
              className="min-w-[260px] rounded-2xl border border-neutral-800 bg-neutral-950/80"
            >
              <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-300 uppercase">
                  {stage.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {stage.opps.length}
                </span>
              </div>
              <div className="p-3 space-y-2">
                {stage.opps.map((o: any) => (
                  <div
                    key={o.id}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-3 space-y-1"
                  >
                    <div className="text-sm font-medium">
                      {o.candidates?.full_name ?? 'Unnamed candidate'}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {o.job_title} · {o.company_name}
                    </div>
                    {o.value && (
                      <div className="text-xs text-neutral-300">
                        £{Number(o.value).toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
                {stage.opps.length === 0 && (
                  <div className="text-xs text-neutral-500">
                    No opportunities in this stage.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
