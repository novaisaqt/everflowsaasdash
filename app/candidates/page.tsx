"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/layout/app-shell";
import CandidateTimeline from "@/components/Candidates/CandidateTimeline";
import ViewCVModal from "@/components/Candidates/ViewCVModal";

export default function CandidatesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Talent Pipeline</h1>

        <CandidateTimeline onSelect={setSelected} />

        {selected && (
          <ViewCVModal
            candidate={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </AppShell>
  );
}
