export default function ViewCVModal({
  candidate,
  onClose
}: {
  candidate: any
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg">

        <button
          onClick={onClose}
          className="text-red-400 text-sm mb-4"
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-2 text-white">
          {candidate.full_name}
        </h2>

        <p className="text-gray-400 mb-2">
          {candidate.email}
        </p>

        <p className="text-gray-400 mb-4">
          Score: {candidate.fit_score}
        </p>

        {candidate.cv_url && (
          <a
            href={candidate.cv_url}
            target="_blank"
            className="text-blue-400 underline"
          >
            View CV
          </a>
        )}

      </div>

    </div>
  )
}
