export default function ViewCVModal({
  candidate,
  onClose,
}: {
  candidate: any
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
      <div className="bg-zinc-900 p-6 rounded-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="text-sm text-red-400 mb-4"
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-2">
          {candidate.full_name}
        </h2>

        <p>Email: {candidate.email}</p>
        <p>Score: {candidate.fit_score}</p>

        {candidate.cv_url && (
          <a
            href={candidate.cv_url}
            target="_blank"
            className="text-blue-400 underline block mt-4"
          >
            View CV
          </a>
        )}
      </div>
    </div>
  )
}
