import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
      <div className="max-w-3xl text-center px-6">
        
        <span className="text-xs uppercase tracking-widest text-blue-400">
          Everflow Hire
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
          Hire better candidates.
          <br />
          In <span className="text-blue-500">5 minutes</span>.
        </h1>

        <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto">
          Everflow AI scans CVs, ranks candidates, and auto-books interviews for recruiters and hiring managers.
          No more spreadsheets. No more guesswork.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition"
          >
            View Demo
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
          <div className="border border-white/10 p-6 rounded-xl bg-white/5">
            ⚡ Auto AI Scoring
            <p className="mt-2 text-xs text-slate-500">
              Instantly rank candidates using AI.
            </p>
          </div>

          <div className="border border-white/10 p-6 rounded-xl bg-white/5">
            🧲 Shortlist in Minutes
            <p className="mt-2 text-xs text-slate-500">
              Drag & drop best matches.
            </p>
          </div>

          <div className="border border-white/10 p-6 rounded-xl bg-white/5">
            📅 Auto Interviews
            <p className="mt-2 text-xs text-slate-500">
              Booked directly via CRM.
            </p>
          </div>
        </div>

        <p className="mt-16 text-xs text-slate-500">
          Built by Everflow AI · UK based · Secure & compliant
        </p>

      </div>
    </main>
  );
}
