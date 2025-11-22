import { Candidate } from "./mockData";

export default function CandidateCard({
  candidate,
  onAction
}: {
  candidate: Candidate;
  onAction: (action: "hire" | "maybe" | "reject") => void;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 card-glow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{candidate.name}</h3>
        <span className="text-green-400 font-bold">{candidate.score}%</span>
      </div>

      <p className="text-sm text-slate-400 mb-3">{candidate.role}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction("hire")}
          className="flex-1 bg-green-500/20 text-green-400 border border-green-500/40 py-2 rounded-lg hover:bg-green-500/40"
        >
          Hire
        </button>
        <button
          onClick={() => onAction("maybe")}
          className="flex-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 py-2 rounded-lg hover:bg-yellow-500/40"
        >
          Maybe
        </button>
        <button
          onClick={() => onAction("reject")}
          className="flex-1 bg-red-500/20 text-red-400 border border-red-500/40 py-2 rounded-lg hover:bg-red-500/40"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
