// src/app/(app)/clients/page.tsx
import AppShell from '@/components/layout/app-shell';
import { requireTenant } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export default async function ClientsPage() {
  const tenant = await requireTenant('manager');

  const { data: candidates } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('tenant_id', tenant.tenantId)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Candidates</h1>
            <p className="text-sm text-neutral-400">
              CVs, prospects and warm talent pool.
            </p>
          </div>
          {/* TODO: Add "Import CVs" button wired to n8n webhook */}
        </div>

        <div className="rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Source</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {candidates?.map((c) => (
                <tr key={c.id} className="border-t border-neutral-800 hover:bg-neutral-900/60">
                  <Td>{c.full_name}</Td>
                  <Td>{c.current_role}</Td>
                  <Td>{c.email}</Td>
                  <Td>{c.phone}</Td>
                  <Td>{c.source}</Td>
                  <Td>{c.status}</Td>
                </tr>
              ))}
              {(!candidates || candidates.length === 0) && (
                <tr>
                  <Td colSpan={6}>No candidates yet. Start by importing CVs.</Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400 uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <td
      className="px-4 py-2 text-sm text-neutral-100"
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
