// src/app/(app)/lead-scraper/page.tsx
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default async function LeadScraperPage() {
  const tenant = await requireTenant('manager');

  const { data: jobs } = await supabaseAdmin
    .from('lead_scrape_jobs')
    .select('*')
    .eq('tenant_id', tenant.tenantId)
    .order('created_at', { ascending: false })
    .limit(20);

  // form handled by /api/lead-scraper (not included but easy to add)
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Lead scraper</h1>
            <p className="text-sm text-neutral-400">
              Send scrape tasks (e.g. “UK SaaS CTO Bristol LinkedIn”) to n8n / your scraper.
            </p>
          </div>
        </div>

        <form
          action="/api/lead-scraper"
          method="post"
          className="rounded-2xl border border-neutral-800 p-4 flex flex-col md:flex-row gap-3"
        >
          <input
            name="query"
            placeholder="e.g. UK recruitment agencies, 2–50 employees, London"
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-white text-black text-sm font-medium"
          >
            Create scrape job
          </button>
        </form>

        <div className="rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <Th>Query</Th>
                <Th>Status</Th>
                <Th>Results</Th>
                <Th>Created</Th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((j) => (
                <tr key={j.id} className="border-t border-neutral-800">
                  <Td>{j.query}</Td>
                  <Td className="capitalize">{j.status}</Td>
                  <Td>{j.results_count ?? 0}</Td>
                  <Td>{new Date(j.created_at).toLocaleString()}</Td>
                </tr>
              ))}
              {(!jobs || jobs.length === 0) && (
                <tr>
                  <Td colSpan={4}>
                    No scrape jobs yet. Start by submitting a query.
                  </Td>
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

function Td({
  children,
  colSpan,
  className,
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-2 text-sm text-neutral-100 ${className ?? ''}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
