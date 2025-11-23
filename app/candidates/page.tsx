"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import AppShell from "../../components/layout/app-shell";
import ViewCVModal from "../../components/ui/ViewCVModal";
import CandidateTimeline from "../../components/ui/CandidateTimeline";

type Candidate = {
  candidate_id: string;
  full_name?: string;
  email?: string;
  pipeline_stage?: string;
  fit_score?: number;
  summary?: string;
  cv_url?: string;
  notes?: string;
  owner?: string | null;
};

const STAGES = ["Shortlisted", "Hot", "Warm", "Interview", "Rejected", "Hired"];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CandidatesPage() {
  const [items, setItems] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setItems(data as Candidate[]);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(
      (c) =>
        c.full_name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term)
    );
  }, [items, search]);

  const patchCandidate = async (
    id: string,
    patch: Partial<Candidate>
  ) => {
    setItems((prev) =>
      prev.map((c) =>
        c.candidate_id === id ? { ...c, ...patch } : c
      )
    );

    await supabase
      .from("candidates")
      .update(patch)
      .eq("candidate_id", id);
  };

  const updateStage = (id: string, newStage: string) => {
    patchCandidate(id, { pipeline_stage: newStage });
  };

  return (
    <AppShell>
      <div className="p-8">

        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Candidates</h1>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border p-2 rounded w-64"
          />
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading candidates...
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {STAGES.map((stage) => (
              <StageColumn
                key={stage}
                stage={stage}
                candidates={filtered.filter(
                  (c) => (c.pipeline_stage || "Shortlisted") === stage
                )}
                dragging={dragging}
                setDragging={setDragging}
                onDrop={(id) => updateStage(id, stage)}
                onPatch={patchCandidate}
              />
            ))}
          </div>
        )}

      </div>
    </AppShell>
  );
}

/* ============================= */

type StageProps = {
  stage: string;
  candidates: Candidate[];
  dragging: string | null;
  setDragging: (id: string | null) => void;
  onDrop: (id: string) => void;
  onPatch: (id: string, patch: Partial<Candidate>) => void;
};

function StageColumn({
  stage,
  candidates,
  dragging,
  setDragging,
  onDrop,
  onPatch,
}: StageProps) {
  const handleDrop = () => {
