export default function StatsBar() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
        Active Role: Senior Product Engineer
      </span>

      <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
        ⏱ Target: 5 minutes
      </span>
    </div>
  );
}
