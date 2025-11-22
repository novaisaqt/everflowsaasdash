export default function StatsBar() {
  return (
    <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-full">
      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
      <span className="text-sm text-slate-300">Time to shortlist</span>
      <span className="text-sm font-bold text-white">05:00</span>
    </div>
  );
}
