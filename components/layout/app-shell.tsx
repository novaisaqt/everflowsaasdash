"use client"

import React from "react"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="p-6 border-b border-white/10 text-xl font-bold">
        Everflow AI Dashboard
      </div>
      <main className="p-6">{children}</main>
    </div>
  )
}
