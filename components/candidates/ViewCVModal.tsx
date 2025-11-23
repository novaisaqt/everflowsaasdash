"use client"

import { Candidate } from "./CandidateTimeline"

interface Props {
  candidate: Candidate
  onClose: () => void
}

export default function ViewCVModal({ candidate, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center">
      <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold mb-2">{candidate.name}</h2>
        <p className="text-white/70 mb-6">{candidate.stage}</p>

        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
}
