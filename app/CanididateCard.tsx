import React from "react";

export type CandidateStatus = "unreviewed" | "hire" | "maybe" | "reject";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
  experience: string;
  status: CandidateStatus;
}

interface Props {
  candidate: Candidate;
  onMove: (id: string, status: CandidateStatus) => void;
}

export default function CandidateCard({ candidate, onMove }: Props) {
  const scoreColor =
    candidate.score >= 85
      ? "text-green-400"
      : candidate.score >= 70
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/60 p-5 mb-4 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white text-sm font-semibold">{candidate.name}</h3>
          <p className="text-xs text-slate-400">
            {candidate.role} • {candidate.experience}
          </p>
        </div>

        <span className={`text-lg font-bold ${scoreColor}`}>
          {candidate.score}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-4 text-xs">
        <button
          onClick={() => onMove(candidate.id, "hire")}
          className="flex-1 py-1.5 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/40"
        >
          Move to Hire
        </button>

        <button
          onClick={() => onMove(candidate.id, "maybe")}
          className="flex-1 py-1.5 rounded-md bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/40"
        >
          Move to Maybe
        </button>

        <button
          onClick={() => onMove(candidate.id, "reject")}
          className="flex-1 py-1.5 rounded-md bg-red-600/20 text-red-400 hover:bg-red-600/40"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
