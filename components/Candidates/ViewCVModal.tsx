export default function ViewCVModal({
  cvUrl,
  score,
}: {
  cvUrl: string
  score: number
}) {
  return (
    <a
      href={cvUrl}
      target="_blank"
      className="px-3 py-2 bg-black text-white text-sm rounded hover:opacity-80"
    >
      View CV (Score: {score})
    </a>
  )
}
