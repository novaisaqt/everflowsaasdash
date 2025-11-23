'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import ViewCVModal from "@/components/Candidates/ViewCVModal"
import CandidateTimeline from "@/components/Candidates/CandidateTimeline"

type Candidate = {
  candidate_id: string
  full_name: string
  email: string
  pipeline_stage: string
  fit_score: number
  cv_url: string
  summary: string
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) setCandidates(data)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Candidates ({candidates.length})
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((c) => (
          <div
            key={c.candidate_id}
            className="border rounded-xl p-4 bg-white shadow"
          >
            <h2 className="font-bold text-lg">{c.full_name}</h2>
            <p className="text-sm">{c.email}</p>
            <p className="text-sm">Stage: {c.pipeline_stage}</p>
            <p className="text-sm">Score: {c.fit_score}</p>

            <div className="mt-4 flex gap-2">
              <ViewCVModal
                cvUrl={c.cv_url}
                score={c.fit_score}
                summary={c.summary}
              />

              <CandidateTimeline
                candidateId={c.candidate_id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
