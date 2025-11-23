"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import AppShell from "../../components/layout/app-shell";
import ViewCVModal from "../../components/ui/ViewCVModal";
import CandidateTimeline from "../../components/ui/CandidateTimeline";

export type Candidate = {
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

      if (!error) setItems(data || []);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("candidates-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "candidates" },
        (payload) => {
          setItems((prev) => {
            const current = [...prev];

            if (payload.eventType === "INSERT") {
              return [payload.new as Candidate, ...current];
            }

            if (payload.eventType === "UPDATE") {
              return current.map((c) =>
                c.candidate_id === (payload.new as any).candidate_id
                  ? (payload.new as Candidate)
                  : c
              );
            }

            if (payload.eventType === "DELETE") {
              return current.filter(
                (c) =>
                  c.candidate_id !== (payload.old as any).candidate_id
              );
            }

            return current;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(
      (c) =>
        c?.full_name?.toLowerCase().includes(term) ||
        c?.email?.toLowerCase().includes(term)
    );
  }, [items, search]);

  const updateStage = async (id: string, newStage: string) => {
    await supabase
      .from("candidates")
      .update({ pipeline_stage: newStage })
      .eq("candidate_id", id);
  };

  return (
    <AppShell>
      <div className="p-8 space-y-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Candidates</h1>
            <p className="text-sm text-muted-foreground">
              {items.length} records synced from Supabase
            </p>
          </div>

          <input
            className="border p-2 rounded-md w-full md:w-72"
            placeholder="Search candidates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && (
          <div className="text-center py-20 text-muted-foreground">
            Loading candidates...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No candidates found
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">

            {STAGES.map((stage) => (
              <div
                key={stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragging) updateStage(dragging, stage);
                  setDragging(null);
                }}
                className="bg-gray-100 p-4 rounded-lg min-h-[75vh] space-y-4"
              >

                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{stage}</h2>
                  <span className="text-xs bg-white px-2 py-1 rounded border">
                    {filtered.filter(
                      (c) => (c.pipeline_stage || "Shortlisted") === stage
                    ).length}
                  </span>
                </div>

                {filtered
                  .filter(
                    (c) =>
                      (c.pipeline_stage || "Shortlisted") === stage
                  )
                  .map((candidate) => (

                    <div
                      key={candidate.candidate_id}
                      draggable
                      onDragStart={() =>
                        setDragging(candidate.candidate_id)
                      }
                      className="bg-white p-4 rounded-md shadow border space-y-3 cursor-move"
                    >

                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm">
                            {candidate.full_name || "Unnamed"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {candidate.email || "N/A"}
                          </p>
                        </div>

                        <span className="text-xs bg-black text-white px-2 py-1 rounded-md">
                          {candidate.pipeline_stage || "Shortlisted"}
                        </span>
                      </div>

                      <p className="text-xs">
                        AI Score: {candidate.fit_score ?? "--"}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {/* ✅ FIXED */}
                        <ViewCVModal candidate={candidate} />
                        <CandidateTimeline candidateId={candidate.candidate_id} />

                        <button
                          className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                          onClick={() =>
                            window.open(
                              `/schedule?candidateId=${candidate.candidate_id}`,
                              "_blank"
                            )
                          }
                        >
                          Schedule
                        </button>
                      </div>

                    </div>

                  ))}

              </div>
            ))}

          </div>
        )}

      </div>
    </AppShell>
  );
}
