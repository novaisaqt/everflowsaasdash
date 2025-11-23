"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@supabase/supabase-js"

import AppShell from "@/components/layout/app-shell"
import ViewCVModal from "@/components/ui/ViewCVModal"
import CandidateTimeline from "@/components/ui/CandidateTimeline"

type Candidate = {
  candidate_id: string
  full_name?: string
  email?: string
  pipeline_stage?: string
  fit_score?: number
  summary?: string
  cv_url?: string
  notes?: string
  owner?: string | null
}

const STAGES = ["Shortlisted", "Hot", "Warm", "Interview", "Rejected", "Hired"]

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CandidatesPage() {
  const [items, setItems] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [dragging, setDragging] = useState<string | null>(null)

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) setItems(data as Candidate[])
      setLoading(false)
    }

    fetchCandidates()
  }, [])

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return items.filter(
      (c) =>
        c.full_name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term)
    )
  }, [items, search])

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <input
            className="border p-2 rounded-md"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <p>Loading candidates...</p>}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div
                key={c.candidate_id}
                className="bg-white p-4 rounded-lg shadow border"
              >
                <h3 className="font-bold">{c.full_name || "Unnamed"}</h3>
                <p className="text-sm text-gray-500">{c.email}</p>

                <div className="mt-3 flex gap-2">
                  <ViewCVModal
                    cvUrl={c.cv_url || ""}
                    score={c.fit_score || 0}
                    summary={c.summary || ""}
                  />

                  <CandidateTimeline
                    candidateId={c.candidate_id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppShell>
  )
}
