"use client";

import { useState } from "react";
import StatsBar from "./StatsBar";
import CandidateCard from "./CandidateCard";
import DropColumn from "./DropColumn";
import UploadZone from "./UploadZone";
import { initialCandidates, Candidate } from "./mockData";

export default function Page() {
  const [candidates, setCandidates] =
    useState<Candidate[]>(initialCandidates);

  const [hire, setHire] = useState<Candidate[]>([]);
  const [maybe, setMaybe] = useState<Candidate[]>([]);
  const [reject, setReject] = useState<Candidate[]>([]);

  const handleMove = (candidate: Candidate, action: "hire" | "maybe" | "reject") => {
    setCandidates((prev) => prev.filter((c) => c.id !== candidate.id));

    if (action === "hire") setHire((prev) => [...prev, candidate]);
    if (action === "maybe") setMaybe((prev) => [...prev, candidate]);
    if (action === "reject") setReject((prev) => [...prev, candidate]);
  };

  return (
    <div className="min-h-screen p-8 bg-[#070b16]">
      {/* HEADER */}
      <div className="flex justify-between mb-12">
        <h1 className="text-2xl font-bold">Everflow AI</h1>
        <StatsBar />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-3">
          <UploadZone />
        </div>

        {/* MIDDLE */}
        <div className="col-span-5 space-y-4">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onMove={handleMove}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-4 space-y-4">
          <DropColumn title="Hire" items={hire} />
          <DropColumn title="Maybe" items={maybe} />
          <DropColumn title="Reject" items={reject} />
        </div>
      </div>
    </div>
  );
}
