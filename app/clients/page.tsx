import AppShell from '@/components/layout/app-shell'
import { requireTenant } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function ClientsPage() {
  const tenant = await requireTenant('manager')

  const { data: candidates, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('tenant_id', tenant.tenantId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Candidates</h1>
            <p className="text-sm text-neutral-400">
              Manage your candidate database, CVs & recruitment notes
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <Th>Name</Th>
                <Th>Title</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Source</Th>
                <Th>Status</Th>
                <Th>CV</Th>
              </tr>
            </thead>

            <tbody>
              {candidates &&
                candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-neutral-800 hover:bg-neutral-900/60"
                  >
                    <Td>{c.full_name}</Td>
                    <Td>{c.current_title || '-'}</Td>
                    <Td>{c.email || '-'}</Td>
                    <Td>{c.phone || '-'}</Td>
                    <Td>{c.source || '-'}</Td>
                    <Td>{c.status || 'new'}</Td>

                    {/* CV Upload */}
                    <Td>
                      <form
                        action={`/api/cv-upload?candidateId=${c.id}`}
                        method="POST"
                        encType="multipart/form-data"
                        className="flex items-center gap-2"
                      >
                        <input
                          type="file"
                          name="file"
                          accept=".pdf,.doc,.docx"
                          className="text-xs max-w-[150px]"
                        />
                        <button
                          type="submit"
                          className="text-[11px] px-2 py-1 rounded-lg border border-neutral-700 hover:border-neutral-100 hover:text-white transition"
                        >
                          Upload
                        </button>
                      </form>
                    </Td>
                  </tr>
                ))}

              {(!candidates || candidates.length === 0) && (
                <tr>
                  <Td colSpan={7}>
                    <span className="text-neutral-500">
                      No candidates yet. Start by importing CVs or adding a lead.
                    </span>
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}

/* ---------- Table helpers ---------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400 uppercase tracking-wide">
      {children}
    </th>
  )
}

function Td({
  children,
  colSpan,
}: {
  children: React.ReactNode
  colSpan?: number
}) {
  return (
    <td
      colSpan={colSpan}
      className="px-4 py-2 text-sm text-neutral-100 align-top"
    >
      {children}
    </td>
  )
}
<form
  action="/api/bulk-upload"
  method="POST"
  encType="multipart/form-data"
  className="flex gap-2 items-center"
>
  <input
    type="file"
    name="files"
    multiple
    accept=".pdf,.doc,.docx"
    className="text-xs"
  />

  <button className="border px-3 py-1 rounded-lg text-xs">
    Bulk Upload CVs
  </button>
</form>
