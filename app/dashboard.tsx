"use client";

import { useState } from "react";
import StatsBar from "./StatsBar";
import UploadZone from "./UploadZone";
import CandidateCard from "./CandidateCard";
import DropColumn from "./DropColumn";
import { initialCandidates, Candidate } from "./mockData";
import { UserButton } from "@clerk/nextjs";


export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [hire, setHire] = useState<Candidate[]>([]);
  const [maybe, setMaybe] = useState<Candidate[]>([]);
  const [reject, setReject] = useState<Candidate[]>([]);

  const moveFromPool = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    setHire((prev) => prev.filter((c) => c.id !== id));
    setMaybe((prev) => prev.filter((c) => c.id !== id));
    setReject((prev) => prev.filter((c) => c.id !== id));
  };

  const handleMove = (candidate: Candidate, action: "hire" | "maybe" | "reject") => {
    moveFromPool(candidate.id);
    if (action === "hire") setHire((prev) => [...prev, candidate]);
    if (action === "maybe") setMaybe((prev) => [...prev, candidate]);
    if (action === "reject") setReject((prev) => [...prev, candidate]);
  };

  const handleDrop = (id: string, action: "hire" | "maybe" | "reject") => {
    const all = [...candidates, ...hire, ...maybe, ...reject];
    const found = all.find((c) => c.id === id);
    if (!found) return;
    handleMove(found, action);
  };

  return (
    <div className="min-h-screen px-6 py-6 lg:px-12 lg:py-10">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Everflow Hire
          </div>
          <h1 className="text-xl font-semibold text-slate-50">
            5-Minute AI Hiring Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Automate CV screening and shortlist the right candidates in minutes.
          </p>
        </div>

        <StatsBar />
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left – inputs */}
        <div className="col-span-12 md:col-span-3">
          <UploadZone />
        </div>

        {/* Centre – ranked candidates */}
        <div className="col-span-12 md:col-span-5">
          <h2 className="text-xs font-semibold text-slate-300 mb-3">
            Ranked candidates
          </h2>

          {candidates.length === 0 && (
            <p className="text-xs text-slate-500 border border-dashed border-slate-700 rounded-lg p-4">
              Once AI scoring is run, candidates will appear here ranked by fit.
            </p>
          )}

          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onMove={handleMove}
            />
          ))}
        </div>

        {/* Right – buckets */}
        <div className="col-span-12 md:col-span-4 space-y-4">
          <DropColumn
            title="Hire"
            items={hire}
            variant="hire"
            onDrop={(id) => handleDrop(id, "hire")}
          />
          <DropColumn
            title="Maybe"
            items={maybe}
            variant="maybe"
            onDrop={(id) => handleDrop(id, "maybe")}
          />
          <DropColumn
            title="Reject"
            items={reject}
            variant="reject"
            onDrop={(id) => handleDrop(id, "reject")}
          />
        </div>
      </div>
    </div>
  );
}
