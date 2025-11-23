"use client";

import AppShell from "@/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Everflow AI – Your Recruitment OS.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-white shadow">
            <h2 className="font-semibold text-lg mb-2">Candidates</h2>
            <p className="text-sm text-gray-600">View and manage all candidates</p>
          </div>

          <div className="p-6 rounded-lg border bg-white shadow">
            <h2 className="font-semibold text-lg mb-2">Analytics</h2>
            <p className="text-sm text-gray-600">Pipeline performance and stats</p>
          </div>

          <div className="p-6 rounded-lg border bg-white shadow">
            <h2 className="font-semibold text-lg mb-2">Settings</h2>
            <p className="text-sm text-gray-600">Manage your account</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
