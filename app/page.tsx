"use client"

import AppShell from "@/components/layout/app-shell"

export default function Home() {
  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Everflow Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System online 🚀
        </p>
      </div>
    </AppShell>
  )
}
