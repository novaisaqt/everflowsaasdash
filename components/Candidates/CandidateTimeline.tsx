export default function CandidateTimeline({
  candidateId,
}: {
  candidateId: string
}) {
  return (
    <div className="px-3 py-2 border text-sm rounded text-gray-700">
      Timeline – {candidateId}
    </div>
  )
}
