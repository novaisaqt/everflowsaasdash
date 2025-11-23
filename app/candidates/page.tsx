"use client"

import AppShell from "@/components/layout/app-shell"
import ViewCVModal from "@/components/ui/ViewCVModal"
import CandidateTimeline from "@/components/ui/CandidateTimeline"


type Candidate = {
  candidate_id: string
  full_name: string
  email: string
  pipeline_stage: string
  fit_score: number
  summary: string
  cv_url: string
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCandidates()
  }, [])

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

  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Candidates</h1>

        {loading && <p>Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <div
              key={c.candidate_id}
              className="bg-white p-4 border rounded-lg shadow"
            >
              <h2 className="font-semibold text-lg mb-1">
                {c.full_name || "Unnamed"}
              </h2>

              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm">Stage: {c.pipeline_stage}</p>
              <p className="text-sm">AI Score: {c.fit_score}</p>

              <div className="mt-4 flex gap-2">
                <ViewCVModal
                  cvUrl={c.cv_url}
                  summary={c.summary}
                  score={c.fit_score}
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
