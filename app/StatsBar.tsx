"use client";

import { useEffect, useState } from "react";

export default function StatsBar() {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/40">
        5-Minute AI Hiring System
      </span>

      <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/40">
        ⏱ Time to shortlist: {minutes}:{seconds}
      </span>
    </div>
  );
}
