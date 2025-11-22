export default function UploadZone() {
  return (
    <div className="p-5 rounded-xl border border-white/10 bg-slate-900/70 space-y-4">
      <h2 className="text-sm font-semibold">1. Inputs</h2>

      <div className="space-y-3 text-xs text-slate-300">
        <div>
          <p className="font-semibold mb-1">Job description</p>
          <div className="border border-dashed border-slate-600 rounded-lg p-3 bg-slate-950/60">
            Paste or upload a job description. AI will extract role
            requirements and must-haves.
          </div>
        </div>

        <div>
          <p className="font-semibold mb-1">Candidate CVs</p>
          <div className="border border-dashed border-slate-600 rounded-lg p-3 bg-slate-950/60">
            Drag & drop CVs or sync from your inbox, job boards or CRM.
          </div>
        </div>
      </div>

      <button className="w-full mt-2 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-sm font-medium shadow-lg shadow-sky-600/30">
        Run AI scoring
      </button>

      <p className="text-[11px] text-emerald-400 mt-1">
        Status: <span className="font-semibold">Ready</span> — once scoring is
        complete, candidates appear ranked in the centre panel.
      </p>
    </div>
  );
}
