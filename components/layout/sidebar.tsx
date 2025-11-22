"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="w-60 bg-neutral-900 border-r border-neutral-800 p-4">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clients">Clients</Link>
        <Link href="/pipeline">Pipeline</Link>
        <Link href="/lead-scraper">Lead Scraper</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </div>
  )
}
