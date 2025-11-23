"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import AppShell from "@/components/layout/app-shell";
import ViewCVModal from "@/components/ui/ViewCVModal";
import CandidateTimeline from "@/components/ui/CandidateTimeline";

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
      const { data } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setItems(data as Candidate[]);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(
      c =>
        c.full_name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term)
    );
  }, [items, search]);

  const updateStage = async (id: string, newStage: string) => {
    setItems(prev =>
      prev.map(c =>
        c.candidate_id === id ? { ...c, pipeline_stage: newStage } : c
      )
    );

    await supabase
      .from("candidates")
      .update({ pipeline_stage: newStage })
      .eq("candidate_id", id);
  };

  return (
    <AppShell>
      <div className="p-8">

        <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Talent Pipeline</h1>
            <p className="text-sm text-muted-foreground">
              {items.length} candidates
            </p>
          </div>

          <input
            className="border p-2 rounded w-full md:w-80"
            placeholder="Search candidates..."
            value={search}
