'use client'

import { Candidate } from "@/types/candidate"

interface CandidateTimelineProps {
  candidates: Candidate[]
  onSelect: (candidate: Candidate) => void
}

export default function CandidateTimeline({ candidates, onSelect }: CandidateTimelineProps) {
  return (
    <>
      {candidates.map((candidate) => (
        <div
          key={candidate.candidate_id}
          className="bg-[#0f172a] border border-white/10 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition"
          onClick={() => onSelect(candidate)}
        >
          <h2 className="font-bold text-lg">
            {candidate.full_name || "Unnamed Candidate"}
          </h2>

          <p className="text-sm opacity-60">{candidate.email || "No email"}</p>
          <p className="text-sm opacity-60">
            {candidate.current_job_title || "No job title"}
          </p>

          <div className="mt-2 flex justify-between text-sm">
            <span>Stage: {candidate.pipeline_stage || "N/A"}</span>
            <span className="text-blue-400 font-bold">
              {candidate.fit_score ?? 0}%
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
