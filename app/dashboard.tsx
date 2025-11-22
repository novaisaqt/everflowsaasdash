import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Everflow Dashboard</h1>
        <UserButton />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Candidates</h2>
          <p className="text-gray-400">Active pipeline</p>
          <p className="text-4xl mt-4 font-bold">148</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Automation Runs</h2>
          <p className="text-gray-400">This Month</p>
          <p className="text-4xl mt-4 font-bold">3,420</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <p className="text-gray-400">Active accounts</p>
          <p className="text-4xl mt-4 font-bold">7</p>
        </div>

      </div>

      <div className="mt-10 bg-slate-900 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4">System Status</h2>

        <ul className="space-y-2 text-gray-300">
          <li>✅ GHL Integration connected</li>
          <li>✅ N8N automations live</li>
          <li>✅ SMS pipelines active</li>
          <li>✅ LinkedIn automations enabled</li>
        </ul>
      </div>

    </div>
  )
}
