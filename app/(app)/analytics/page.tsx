"use client"

import AppShell from "@/components/layout/app-shell"

export default function AnalyticsPage() {
  const stats = [
    { title: "Total Candidates", value: 124 },
    { title: "AI Shortlisted", value: 37 },
    { title: "Interviews Booked", value: 18 },
    { title: "Hires Completed", value: 6 }
  ]

  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">
          📊 AI Recruitment Analytics
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-4xl font-bold mt-2">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold text-lg mb-4">
              🔥 Top Performing Roles
            </h2>
            <ul className="space-y-3">
              <li>• Software Engineer</li>
              <li>• Sales Executive</li>
              <li>• Data Analyst</li>
              <li>• Product Designer</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold text-lg mb-4">
              ⚡ System Health
            </h2>
            <ul className="space-y-3 text-sm">
              <li>✅ API connected</li>
              <li>✅ Database synced</li>
              <li>✅ AI engine running</li>
              <li>🟡 Awaiting more data</li>
            </ul>
          </div>

        </div>
      </div>
    </AppShell>
  )
}
