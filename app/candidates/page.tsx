"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import AppShell from "@/components/layout/app-shell";
import ViewCVModal from "@/components/ui/ViewCVModal";
import CandidateTimeline from "@/components/ui/CandidateTimeline";

type Candidate = {
  candidate_id: string;
  full_name: string | null;
  email: string | null;
  pipeline_stage: string | null;
  fit_score: number | null;
  summary: string | null;
  cv_url: string | null;
};

const STAGES = ["Shortlisted", "Hot", "Warm", "Interview", "Rejected", "Hired"];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");

  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError("Failed to load candidates from Supabase.");
      } else {
        setCandidates((data || []) as Candidate[]);
      }

      setLoading(false);
    };

    loadCandidates();
  }, []);

  const filtered = candidates.filter((c) => {
    const term = search.toLowerCase().trim();
    const matchesSearch =
      !term ||
      c.full_name?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term);

    const matchesStage =
      stageFilter === "All" ||
      (c.pipeline_stage || "Shortlisted") === stageFilter;

    return matchesSearch && matchesStage;
  });

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Candidates</h1>
            <p className="text-sm text-gray-500">
              {candidates.length} total records
              {filtered.length !== candidates.length && (
                <> • {filtered.length} shown</>
              )}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full md:w-72"
            />

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full md:w-40"
            >
              <option value="All">All stages</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading / error states */}
        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading candidates from Supabase…
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No candidates found. Add some rows to your <code>candidates</code>{" "}
            table in Supabase.
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div
                key={c.candidate_id}
                className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {c.full_name || "Unnamed candidate"}
                    </h2>
                    <p className="text-xs text-gray-500 break-all">
                      {c.email || "No email"}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 border">
                    {c.pipeline_stage || "Shortlisted"}
                  </span>
                </div>

                <div className="text-xs text-gray-600">
                  <span className="font-semibold">AI fit score:</span>{" "}
                  {c.fit_score ?? "N/A"}
                </div>

                {c.summary && (
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {c.summary}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                  <ViewCVModal
                    cvUrl={c.cv_url || ""}
                    score={c.fit_score || 0}
                    summary={c.summary || ""}
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
