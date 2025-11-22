import React from "react";

export default function StatsBar() {
  return (
    <div className="flex items-center gap-6 text-sm text-slate-400">
      <div className="border border-sky-500/30 px-3 py-1 rounded-full">
        Active Role: Senior Product Engineer (Remote)
      </div>
      <div className="border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400">
        ⏱ Time to shortlist: 05:00
      </div>
    </div>
  );
}
