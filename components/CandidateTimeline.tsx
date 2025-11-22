'use client'
import { useState } from 'react'

export default function CandidateTimeline({ candidateId }: { candidateId: string }) {
  const [note, setNote] = useState('')

  async function addNote() {
    if (!note) return

    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ candidateId, content: note }),
      headers: { 'Content-Type': 'application/json' },
    })

    setNote('')
    window.location.reload()
  }

  return (
    <div className="space-y-2 border border-neutral-800 rounded-xl p-2 mt-2">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add note..."
        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg text-xs p-2"
      />

      <button
        onClick={addNote}
        className="text-xs border border-neutral-700 rounded px-2 py-1"
      >
        Save Note
      </button>
    </div>
  )
}
