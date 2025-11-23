"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import ViewCVModal from "@/components/Candidates/ViewCVModal"
import CandidateTimeline from "@/components/Candidates/CandidateTimeline"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div>Loading candidates...</div>

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <span className="text-sm text-gray-500">
          {candidates.length} records
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 border rounded-lg shadow-sm"
          >
            <h2 className="font-semibold mb-2">
              {c.full_name ?? "Unnamed"}
            </h2>

            <p className="text-sm">Email: {c.email ?? "N/A"}</p>
            <p className="text-sm">Stage: {c.pipeline_stage ?? "N/A"}</p>
            <p className="text-sm">Score: {c.fit_score ?? 0}</p>

            <div className="mt-4 flex gap-2">
              <ViewCVModal
                cvUrl={c.cv_url ?? ""}
                score={c.fit_score ?? 0}
              />

              <CandidateTimeline candidateId={c.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
