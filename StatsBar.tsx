export default function StatsBar() {
  return (
    <div className="flex items-center gap-4 bg-[#020617] border border-[#1f2937] rounded-full px-6 py-2 text-sm shadow-lg">
      
      {/* Savings */}
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-semibold">●</span>
        <span className="text-gray-400">Clients saved:</span>
        <span className="text-white font-semibold">£14,750</span>
      </div>

      <div className="w-px h-4 bg-gray-700" />

      {/* Time */}
      <div className="flex items-center gap-2">
        <span className="text-blue-400 font-semibold">●</span>
        <span className="text-gray-400">Average time:</span>
        <span className="text-white font-semibold">4:21</span>
      </div>

    </div>
  );
}
