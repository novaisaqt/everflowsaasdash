"use client";

import ViewCVModal from "@/components/Candidates/ViewCVModal"
import CandidateTimeline from "@/components/Candidates/CandidateTimeline"
import AppShell from "@/components/layout/app-shell"

type Candidate = {
  candidate_id: string;
  full_name?: string | null;
  email?: string | null;
  pipeline_stage?: string | null;
  fit_score?: number | null;
  summary?: string | null;
  cv_url?: string | null;
};

// Supabase client using NEXT_PUBLIC env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading candidates:", error);
      } else {
        setCandidates((data || []) as Candidate[]);
      }
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <span className="text-sm text-muted-foreground">
            {candidates?.length ?? 0} records
          </span>
        </div>

        {loading && (
          <div className="text-muted-foreground">Loading candidates…</div>
        )}

        {!loading && candidates.length === 0 && (
          <div className="text-muted-foreground">
            No candidates found in Supabase.
          </div>
        )}

        {!loading && candidates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {candidates.map((c) => (
              <div
                key={c.candidate_id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <h2 className="font-semibold text-lg mb-2">
                  {c.full_name ?? "Unnamed Candidate"}
                </h2>

                <p className="text-sm">
                  <strong>Email:</strong> {c.email ?? "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Stage:</strong> {c.pipeline_stage ?? "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Score:</strong> {c.fit_score ?? "N/A"}
                </p>

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
        )}
      </div>
    </AppShell>
  );
}
