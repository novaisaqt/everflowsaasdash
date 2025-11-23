"use client"

import { useState } from "react"
import CandidateTimeline, {
  Candidate,
} from "../../components/candidates/CandidateTimeline"
import ViewCVModal from "../../components/candidates/ViewCVModal"
import AppShell from "../../components/layout/app-shell"

export default function CandidatesPage() {
  const [selected, setSelected] = useState<Candidate | null>(null)

  return (
    <AppShell>
      <h1 className="text-3xl font-bold mb-6">Talent Pipeline</h1>

      <CandidateTimeline onSelect={setSelected} />

      {selected && (
        <ViewCVModal candidate={selected} onClose={() => setSelected(null)} />
      )}
    </AppShell>
  )
}
