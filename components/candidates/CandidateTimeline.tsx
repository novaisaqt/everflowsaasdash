type Props = {
  onSelect: (id: string) => void
}

export default function CandidateTimeline({ onSelect }: Props) {
  const candidates = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Smith' },
  ]

  return (
    <div className="space-y-4">
      {candidates.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="p-4 border rounded cursor-pointer hover:bg-gray-100"
        >
          {c.name}
        </div>
      ))}
    </div>
  )
}
