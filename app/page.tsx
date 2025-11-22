"use client";

import { useState } from "react";
import StatsBar from "./StatsBar";
import UploadZone from "./UploadZone";
import CandidateCard from "./CandidateCard";
import DropColumn from "./DropColumn";
import { initialCandidates, Candidate } from "./mockData";


export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [hire, setHire] = useState<Candidate[]>([]);
  const [maybe, setMaybe] = useState<Candidate[]>([]);
  const [reject, setReject] = useState<Candidate[]>([]);

  const handleAction = (candidate: Candidate, action: "hire" | "maybe" | "reject") => {
    setCandidates((prev) => prev.filter((c) => c.id !== candidate.id));

    if (action === "hire") setHire((prev) => [...prev, candidate]);
    if (action === "maybe") setMaybe((prev) => [...prev, candidate]);
    if (action === "reject") setReject((prev) => [...prev, candidate]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h1 className="text-xl font-semibold">Everflow Hire</h1>
        <StatsBar />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-3 space-y-6">
          <UploadZone />
        </div>

        {/* CENTER */}
        <div className="col-span-5">
          <h2 className="mb-4 text-lg">Ranked Candidates</h2>
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onAction={(action) => handleAction(c, action)}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-4 grid grid-rows-3 gap-4">
          <DropColumn title="Hire" items={hire} color="green" />
          <DropColumn title="Maybe" items={maybe} color="yellow" />
          <DropColumn title="Reject" items={reject} color="red" />
        </div>

      </div>
    </div>
  );
}
