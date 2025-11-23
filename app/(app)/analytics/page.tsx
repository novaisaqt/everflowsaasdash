"use client"

import AppShell from "@/components/layout/app-shell"

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="font-semibold mb-2">Total Candidates</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="font-semibold mb-2">AI Scored</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="font-semibold mb-2">Top Matches</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

        </div>

        <div className="mt-10 bg-white p-6 rounded-lg shadow border">
          <h2 className="font-semibold mb-4">System Status</h2>

          <ul className="space-y-2 text-sm">
            <li>✅ Server connected</li>
            <li>✅ Database ready</li>
            <li>✅ AI pipelines active</li>
            <li>🟡 Waiting for real data</li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}
