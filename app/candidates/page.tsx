"use client"

import { useEffect, useState } from "react"
import AppShell from "@/components/layout/app-shell"
import { supabase } from "@/lib/supabase"
import ViewCVModal from "@/components/candidates/ViewCVModal"
import CandidateTimeline from "@/components/candidates/CandidateTimeline"

export type Candidate = {
  candidate_id: string
  full_name: string | null
  email: string | null
  pipeline_stage: string | null
  fit_score: number | null
  cv_url: string | null
  summary: string | null
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setCandidates(data as Candidate[])
      }

      setLoading(false)
    }

    loadCandidates()
  }, [])

  return (
    <AppShell>
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <span className="text-sm opacity-70">
            {candidates.length} records
          </span>
        </div>

        {loading && <p>Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <div key={c.candidate_id} className="border border-slate-800 rounded-xl p-5 bg-slate-900 shadow">

              <h2 className="font-semibold text-lg mb-2">
                {c.full_name ?? "Unnamed Candidate"}
              </h2>

              <p className="text-sm"><strong>Email:</strong> {c.email ?? "N/A"}</p>
              <p className="text-sm"><strong>Stage:</strong> {c.pipeline_stage ?? "N/A"}</p>
              <p className="text-sm"><strong>Score:</strong> {c.fit_score ?? "N/A"}</p>

              <div className="mt-4 flex gap-2">
                <ViewCVModal
                  cvUrl={c.cv_url ?? ""}
                  score={c.fit_score ?? 0}
                  summary={c.summary ?? ""}
                />

                <CandidateTimeline candidateId={c.candidate_id} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
