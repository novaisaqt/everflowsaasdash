import { Candidate } from "./mockData";

export default function CandidateCard({
  candidate,
  onMove,
}: {
  candidate: Candidate;
  onMove: (candidate: Candidate, type: "hire" | "maybe" | "reject") => void;
}) {
  const scoreColor =
    candidate.score >= 85
      ? "text-green-400"
      : candidate.score >= 70
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="border border-white/10 rounded-xl bg-black/50 p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{candidate.name}</h3>
          <p className="text-sm text-gray-400">
            {candidate.role} — {candidate.experience}
          </p>
        </div>

        <span className={`text-lg font-bold ${scoreColor}`}>
          {candidate.score}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-full bg-white/10"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          className="bg-green-700/70 px-3 py-1 rounded"
          onClick={() => onMove(candidate, "hire")}
        >
          Hire
        </button>

        <button
          className="bg-yellow-700/70 px-3 py-1 rounded"
          onClick={() => onMove(candidate, "maybe")}
        >
          Maybe
        </button>

        <button
          className="bg-red-700/70 px-3 py-1 rounded"
          onClick={() => onMove(candidate, "reject")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

