export default function CandidateTimeline({
  candidates,
  onSelect,
}: {
  candidates: any[]
  onSelect: (candidate: any) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((c) => (
        <div
          key={c.id}
          className="border p-4 rounded cursor-pointer hover:border-blue-400"
          onClick={() => onSelect(c)}
        >
          <h2 className="font-bold">{c.full_name || "Unnamed"}</h2>
          <p className="text-sm">Score: {c.fit_score}</p>
          <p className="text-sm">{c.email}</p>
        </div>
      ))}
    </div>
  )
}
