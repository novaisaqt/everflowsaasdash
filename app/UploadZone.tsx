export default function UploadZone() {
  return (
    <div className="border border-white/10 rounded-xl p-4 bg-slate-900/80 space-y-3">
      <p className="text-sm text-slate-400">
        Upload job description or candidate CVs
      </p>

      <button className="w-full bg-sky-600 hover:bg-sky-700 py-2 rounded-lg text-white text-sm">
        Upload Files
      </button>

      <p className="text-xs text-emerald-400">
        Status: Ready
      </p>
    </div>
  );
}
