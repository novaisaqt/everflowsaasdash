"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AppShell from "../../components/AppShell";
import ViewCVModal from "../../components/ViewCVModal";
import CandidateTimeline from "../../components/CandidateTimeline";

type Candidate = {
  candidate_id: string;
  full_name?: string;
  email?: string;
  pipeline_stage?: string;
  fit_score?: number;
  summary?: string;
  cv_url?: string;
  notes?: string;
  owner?: string | null; // assigned recruiter
};

const STAGES = ["Shortlisted", "Hot", "Warm", "Interview", "Rejected", "Hired"];

// 🔐 Supabase client (uses NEXT_PUBLIC_ env vars)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CandidatesPage() {
  const [items, setItems] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);
  const [aiSorting, setAiSorting] = useState(false);

  // 🚀 Fetch initial candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false }); // adjust if no created_at

      if (error) {
        console.error("Error loading candidates:", error);
      } else {
        setItems((data || []) as Candidate[]);
      }

      setLoading(false);
    };

    fetchCandidates();
  }, []);

  // 🔴 Supabase realtime
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

  // 🔍 Filtered by search
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(
      (c) =>
        c?.full_name?.toLowerCase().includes(term) ||
        c?.email?.toLowerCase().includes(term)
    );
  }, [items, search]);

  // ♻️ Update any fields in Supabase + local state
  const patchCandidate = async (
    id: string,
    patch: Partial<Candidate>,
    opts: { optimistic?: boolean; logActivity?: string } = {}
  ) => {
    const { optimistic = true, logActivity } = opts;

    // optimistic UI
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
      console.error("Update failed:", error);
      if (optimistic && previous) {
        // rollback
        setItems((prev) =>
          prev.map((c) =>
            c.candidate_id === id ? previous! : c
          )
        );
      }
      return;
    }

    // optional activity log
    if (logActivity) {
      await supabase.from("candidate_activity").insert({
        candidate_id: id,
        type: logActivity,
        new_stage: patch.pipeline_stage ?? null,
        meta: patch,
      });
    }
  };

  // 🔁 Stage change via drag & drop
  const updateStage = (id: string, newStage: string) => {
    patchCandidate(
      id,
      { pipeline_stage: newStage },
      { optimistic: true, logActivity: "stage_change" }
    );
  };

  // 🧠 Local AI-style re-rank (desc by fit_score)
  const handleAiRerank = () => {
    setAiSorting(true);
    setItems((prev) => {
      const copy = [...prev];
      copy.sort((a, b) => (b.fit_score ?? 0) - (a.fit_score ?? 0));
      return copy;
    });

    setTimeout(() => setAiSorting(false), 500);
    // Later: replace with call to your /api/ai-rank endpoint
  };

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Talent Pipeline
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length} total candidates • Live Supabase sync
            </p>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-md w-full md:w-72"
            />

            <button
              onClick={handleAiRerank}
              disabled={aiSorting || items.length === 0}
              className="mt-2 md:mt-0 md:ml-3 bg-black text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
            >
              {aiSorting ? "Re-ranking..." : "AI Re-rank by Fit Score"}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-muted-foreground py-8">
            Loading candidates from Supabase...
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            No candidates match your search yet.
          </div>
        )}

        {/* Kanban Board */}
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

/* ---------- Subcomponents ---------- */

type StageColumnProps = {
  stage: string;
  candidates: Candidate[];
  dragging: string | null;
  setDragging: (id: string | null) => void;
  onDrop: (id: string) => void;
  onPatch: (
    id: string,
    patch: Partial<Candidate>,
    opts?: { optimistic?: boolean; logActivity?: string }
  ) => void;
};

function StageColumn({
  stage,
  candidates,
  dragging,
  setDragging,
  onDrop,
  onPatch,
}: StageColumnProps) {
  const handleDrop = () => {
    if (!dragging) return;
    onDrop(dragging);
    setDragging(null);
  };

  return (
    <div
      className="bg-gray-100 rounded-lg p-3 flex flex-col gap-4 min-h-[75vh]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{stage}</h2>
        <span className="text-sm bg-white px-2 py-1 rounded-md border">
          {candidates.length}
        </span>
      </div>

      {candidates.map((c) => (
        <CandidateCard
          key={c.candidate_id}
          candidate={c}
          onDragStart={() => setDragging(c.candidate_id)}
          onPatch={onPatch}
        />
      ))}
    </div>
  );
}

type CandidateCardProps = {
  candidate: Candidate;
  onDragStart: () => void;
  onPatch: (
    id: string,
    patch: Partial<Candidate>,
    opts?: { optimistic?: boolean; logActivity?: string }
  ) => void;
};

function CandidateCard({ candidate, onDragStart, onPatch }: CandidateCardProps) {
  const stageColor = (stage?: string) => {
    switch ((stage || "").toLowerCase()) {
      case "hot":
        return "bg-red-500 text-white";
      case "warm":
        return "bg-yellow-400 text-black";
      case "interview":
        return "bg-blue-500 text-white";
      case "rejected":
        return "bg-gray-700 text-white";
      case "hired":
        return "bg-green-600 text-white";
      default:
        return "bg-indigo-500 text-white";
    }
  };

  const owners = [
    { value: "", label: "Unassigned" },
    { value: "ben", label: "Ben" },
    { value: "alice", label: "Alice" },
    { value: "team", label: "Team pool" },
  ];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white p-4 rounded-lg shadow border flex flex-col gap-2 cursor-move"
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold text-sm">
            {candidate.full_name || "Unnamed"}
          </h3>
          <p className="text-xs text-gray-600 truncate max-w-[150px]">
            {candidate.email || "N/A"}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full ${stageColor(
            candidate.pipeline_stage
          )}`}
        >
          {candidate.pipeline_stage || "Shortlisted"}
        </span>
      </div>

      {/* AI Score + Owner */}
      <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
        <span>
          AI Score:{" "}
          <span className="font-semibold">
            {candidate.fit_score ?? "--"}
          </span>
        </span>

        <select
          value={candidate.owner || ""}
          onChange={(e) =>
            onPatch(
              candidate.candidate_id,
              { owner: e.target.value },
              { optimistic: true, logActivity: "owner_change" }
            )
          }
          className="border rounded px-1 py-0.5 text-xs"
        >
          {owners.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <textarea
        placeholder="Quick notes..."
        value={candidate.notes || ""}
        onChange={(e) =>
          onPatch(
            candidate.candidate_id,
            { notes: e.target.value },
            { optimistic: true }
          )
        }
        className="border p-1 rounded text-xs resize-none h-14"
      />

      {/* Actions */}
      <div className="mt-2 flex flex-wrap gap-2">
        <ViewCVModal
          cvUrl={candidate.cv_url || ""}
          score={Number(candidate.fit_score) || 0}
          summary={candidate.summary || ""}
        />

        <CandidateTimeline candidateId={candidate.candidate_id} />

        {/* Schedule interview */}
        <button
          className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => {
            // You can swap this for your GHL calendar or Calendly link
            const url = `/schedule?candidateId=${candidate.candidate_id}`;
            window.open(url, "_blank");
          }}
        >
          Schedule
        </button>

        {/* One-click outreach */}
        <button
          className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => {
            // Hook this to N8N / GHL webhook later
            console.log("Trigger outreach for", candidate.candidate_id);
            alert("Outreach flow triggered (wire this to N8N / GHL API)");
          }}
        >
          Outreach
        </button>
      </div>
    </div>
  );
}
