export default function CandidateTimeline({
  candidates,
  onSelect
}: {
  candidates: any[]
  onSelect: (candidate: any) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {candidates.map((c) => (
        <div
          key={c.id}
          className="p-4 border rounded-lg bg-white shadow hover:shadow-md cursor-pointer"
          onClick={() => onSelect(c)}
        >
          <h2 className="font-bold">{c.full_name}</h2>
          <p className="text-sm text-gray-500">{c.email}</p>
          <p className="text-sm mt-2">
            Fit Score: <span className="font-semibold">{c.fit_score}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
