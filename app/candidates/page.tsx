export const dynamic = "force-dynamic"

"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import CandidateTimeline from "../../components/Candidates/CandidateTimeline"
import ViewCVModal from "../../components/Candidates/ViewCVModal"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("fit_score", { ascending: false })

      if (!error && data) {
        setCandidates(data)
      }

      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div className="p-8">Loading candidates...</div>

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <span className="text-sm text-gray-500">
          {candidates.length} records
        </span>
      </div>

      <CandidateTimeline
        candidates={candidates}
        onSelect={setSelectedCandidate}
      />

      {selectedCandidate && (
        <ViewCVModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

    </div>
  )
}
