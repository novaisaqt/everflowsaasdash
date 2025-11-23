"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import CandidateTimeline from "../../components/Candidates/CandidateTimeline"
import ViewCVModal from "../../components/Candidates/ViewCVModal"

export const dynamic = "force-dynamic"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("candidates")
        .select("*")
        .order("fit_score", { ascending: false })

      if (data) setCandidates(data)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Candidates ({candidates.length})
      </h1>

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
