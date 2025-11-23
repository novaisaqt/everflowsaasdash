export default function ViewCVModal({
  cvUrl,
  score,
  summary,
}: {
  cvUrl: string
  score: number
  summary: string
}) {
  return (
    <a
      href={cvUrl}
      target="_blank"
      className="bg-black text-white px-3 py-1 rounded"
    >
      View CV ({score})
    </a>
  )
}
