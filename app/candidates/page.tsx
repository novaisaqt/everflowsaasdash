"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import AppShell from "../../components/layout/app-shell";
import ViewCVModal from "../../components/ui/ViewCVModal";
import CandidateTimeline from "../../components/ui/CandidateTimeline";

type Candidate = {
  candidate_id: string;
  full_name: string;
  email: string;
  pipeline_stage?: string;
  fit_score?: number;
  summary?: string;
  cv_url?: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from("candidates").select("*");

    if (!error && data) setCandidates(data);
  };

  return (
    <AppShell>
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <span className="text-sm text-muted-foreground">
            {candidates.length} records
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <div
              key={c.candidate_id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">
                {c.full_name || "Unnamed"}
              </h2>

              <p className="text-sm"><strong>Email:</strong> {c.email}</p>
              <p className="text-sm"><strong>Stage:</strong> {c.pipeline_stage}</p>
              <p className="text-sm"><strong>Score:</strong> {c.fit_score}</p>

              <button
                onClick={() => setSelected(c)}
                className="mt-4 text-blue-600 hover:underline"
              >
                View CV
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <ViewCVModal candidate={selected} onClose={() => setSelected(null)} />
        )}

      </div>
    </AppShell>
  );
}
