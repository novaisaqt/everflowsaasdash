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
  const [aiSorting, setAiSorting] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading candidates:", error.message);
      } else {
        setItems((data || []) as Candidate[]);
      }

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
                (c) => c.candidate_id !== (payload.old as any).candidate_id
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

  const patchCandidate = async (
    id: string,
    patch: Partial<Candidate>,
    opts: { optimistic?: boolean; logActivity?: string } = {}
  ) => {
    const { optimistic = true, logActivity } = opts;

    let previous: Candidate | undefined;

    if (optimistic) {
      setItems((prev) =>
        prev.map((c) => {
          if (c.candidate_id === id) {
            previous = c;
            return { ...c, ...patch };
          }
          return c;
        })
      );
    }

    const { error } = await supabase
      .from("candidates")
      .update(patch)
      .eq("candidate_id", id);

    if (error) {
      console.error("Update failed:", error.message);

      if (optimistic && previous) {
        setItems((prev) =>
          prev.map((c) => (c.candidate_id === id ? previous! : c))
        );
      }
      return;
    }

    if (logActivity) {
      await supabase.from("candidate_activity").insert({
        candidate_id: id,
        type: logActivity,
        new_stage: patch.pipeline_stage ?? null,
        meta: patch,
      });
    }
  };

  const updateStage = (id: string, newStage: string) => {
    patchCandidate(
      id,
      { pipeline_stage: newStage },
      { optimistic: true, logActivity: "stage_change" }
    );
  };

  const handleAiRerank = () => {
    setAiSorting(true);

    setItems((prev) => {
      const copy = [...prev];
      copy.sort((a, b) => (b.fit_score ?? 0) - (a.fit_score ?? 0));
      return copy;
    });

    setTimeout(() => setAiSorting(false), 500);
  };

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Talent Pipeline</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length} total candidates • Live sync
            </p>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-md w-full md:w-72"
            />

            <button
              onClick={handleAiRerank}
              disabled={aiSorting || items.length === 0}
              className="mt-2 md:mt-0 md:ml-3 bg-black text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
            >
              {aiSorting ? "Sorting..." : "AI Sort"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-10">Loading candidates...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            No candidates match your search.
          </div>
        )}

        {!loading && filtered.length > 0 && (
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
