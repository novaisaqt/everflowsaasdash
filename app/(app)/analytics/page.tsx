import { requireTenant } from '@/lib/auth'

export default async function AnalyticsPage() {
  await requireTenant('owner') // owner/admin only

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <p className="text-neutral-400 mt-4">Your analytics will appear here.</p>
    </div>
  )
}
