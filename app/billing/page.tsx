// src/app/(app)/billing/page.tsx
import AppShell from '@/components/layout/app-shell';
import { requireTenant } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export default async function BillingPage() {
  const tenant = await requireTenant('manager');

  const { data: billing } = await supabaseAdmin
    .from('billing_accounts')
    .select('*')
    .eq('tenant_id', tenant.tenantId)
    .maybeSingle();

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-semibold">Billing</h1>
          <p className="text-sm text-neutral-400">
            Manage your subscription and usage.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 p-4 space-y-2">
          <div className="text-sm text-neutral-300">
            Current plan:{' '}
            <span className="font-medium">
              {billing?.plan ?? 'None (trial)'}
            </span>
          </div>
          <div className="text-xs text-neutral-500">
            Status: {billing?.status ?? 'inactive'}
          </div>
          {billing?.current_period_end && (
            <div className="text-xs text-neutral-500">
              Renews:{' '}
              {new Date(billing.current_period_end).toLocaleDateString()}
            </div>
          )}

          <form action="/api/billing/portal" method="post" className="mt-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium"
            >
              Open billing portal
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <PlanCard name="Starter" price="£97/m" features={['1 tenant', 'Up to 5 users', 'Basic automations']} />
          <PlanCard name="Growth" price="£197/m" features={['3 tenants', 'Unlimited users', 'Advanced automations']} />
          <PlanCard name="Scale" price="£497/m" features={['Unlimited tenants', 'Priority support', 'Custom workflows']} />
        </div>
      </div>
    </AppShell>
  );
}

function PlanCard({
  name,
  price,
  features,
}: {
  name: string;
  price: string;
  features: string[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 p-4 flex flex-col gap-3">
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xl font-semibold">{price}</div>
      <ul className="text-xs text-neutral-400 space-y-1">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
    </div>
  );
}
