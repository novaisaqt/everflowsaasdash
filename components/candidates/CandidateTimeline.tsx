"use client"

export type Candidate = {
  id: string
  name: string
  stage: string
}

interface Props {
  onSelect: (candidate: Candidate) => void
}

export default function CandidateTimeline({ onSelect }: Props) {
  const candidates: Candidate[] = [
    { id: "1", name: "John Carter", stage: "Screening" },
    { id: "2", name: "Sarah Thompson", stage: "Interview" }
  ]

  return (
    <div className="grid gap-4">
      {candidates.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className="cursor-pointer rounded border border-white/10 bg-[#111827] p-4 hover:border-blue-500"
        >
          <h3 className="font-semibold">{c.name}</h3>
          <p className="text-sm text-white/70">{c.stage}</p>
        </div>
      ))}
    </div>
  )
}
