import { ReactNode } from "react"

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <aside className="w-64 bg-slate-900 p-6">
          <h1 className="text-xl font-bold mb-6">Everflow</h1>
          <nav className="space-y-4">
            <a href="/" className="block opacity-80 hover:opacity-100">
              Dashboard
            </a>
            <a href="/candidates" className="block opacity-80 hover:opacity-100">
              Candidates
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
