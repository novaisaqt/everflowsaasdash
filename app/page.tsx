"use client"

import AppShell from "@/components/layout/app-shell"

export default function HomePage() {
  return (
    <AppShell>
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Everflow Dashboard</h1>
        <p>System online ✅</p>
      </div>
    </AppShell>
  )
}
