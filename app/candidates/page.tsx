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

// Supabase client
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
      (c) =>
        c?.full_name?.toLowerCase().includes(term) ||
        c?.email?.toLowerCase().includes(term)
    );
  }, [items, search]);

  const updateStage = async (id: string, stage: string) => {
    await supabase.from("candidates").update({
      pipeline_stage: stage,
    }).eq("candidate_id", id);

    setItems((prev) =>
      prev.map((c) =>
        c.candidate_id === id ? { ...c, pipeline_stage: stage } : c
      )
    );
  };

  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Talent Pipeline</h1>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-6"
        />
