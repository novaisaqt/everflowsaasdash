import AppShell from "../components/layout/app-shell"

export default function Home() {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">Everflow AI Dashboard</h1>
      <p className="text-white/70 mt-2">
        Navigate to /candidates to view the pipeline
      </p>
    </AppShell>
  )
}
