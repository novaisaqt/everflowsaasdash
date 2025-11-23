'use client'

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Candidate } from "@/types/candidate";

import CandidateTimeline from "@/components/Candidates/CandidateTimeline";
import ViewCVModal from "@/components/Candidates/ViewCVModal";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const loadCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("fit_score", { ascending: false });

      if (!error && data) {
        setCandidates(data as Candidate[]);
      }

      setLoading(false);
    };

    loadCandidates();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold">Loading candidates...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <span className="text-sm opacity-70">
          {candidates.length} records
        </span>
      </div>

      {candidates.length === 0 && (
        <p className="opacity-60">No candidates found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CandidateTimeline
          candidates={candidates}
          onSelect={(candidate: Candidate) => setSelectedCandidate(candidate)}
        />
      </div>

      {selectedCandidate && (
        <ViewCVModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
