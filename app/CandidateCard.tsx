import { Candidate } from "./mockData";

export default function CandidateCard({
  candidate,
  onMove,
}: {
  candidate: Candidate;
  onMove: (candidate: Candidate, action: "hire" | "maybe" | "reject") => void;
}) {
  const scoreColor =
    candidate.score >= 85
      ? "text-emerald-400"
      : candidate.score >= 70
      ? "text-yellow-400"
      : "text-rose-400";

  return (
    <div
      className="border border-white/10 rounded-xl bg-slate-900/70 p-4 mb-3 space-y-3 cursor-grab"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("candidateId", candidate.id);
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">
            {candidate.name}
          </h3>
          <p className="text-[11px] text-slate-400">
            {candidate.role} • {candidate.experience}
          </p>
        </div>

        <span className={`text-lg font-bold ${scoreColor}`}>
          {candidate.score}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px]">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2 pt-1 text-[11px]">
        <button
          className="flex-1 py-1.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25"
          onClick={() => onMove(candidate, "hire")}
        >
          Move to Hire
        </button>
        <button
          className="flex-1 py-1.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25"
          onClick={() => onMove(candidate, "maybe")}
        >
          Move to Maybe
        </button>
        <button
          className="flex-1 py-1.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/40 hover:bg-rose-500/25"
          onClick={() => onMove(candidate, "reject")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
