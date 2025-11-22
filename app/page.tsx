"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
};

const initialCandidates: Candidate[] = [
  { id: "1", name: "Jack Taylor", role: "Full Stack Dev", score: 91 },
  { id: "2", name: "Amelia Jones", role: "Product Designer", score: 84 },
  { id: "3", name: "Ravi Kumar", role: "AI Engineer", score: 76 },
];

export default function Dashboard() {
  const [unreviewed, setUnreviewed] = useState<Candidate[]>(initialCandidates);
  const [hire, setHire] = useState<Candidate[]>([]);
  const [maybe, setMaybe] = useState<Candidate[]>([]);
  const [reject, setReject] = useState<Candidate[]>([]);

  const move = (candidate: Candidate, list: "hire" | "maybe" | "reject") => {
    setUnreviewed((prev) => prev.filter((c) => c.id !== candidate.id));

    if (list === "hire") setHire((prev) => [...prev, candidate]);
    if (list === "maybe") setMaybe((prev) => [...prev, candidate]);
    if (list === "reject") setReject((prev) => [...prev, candidate]);
  };

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        {/* User */}
        <div className="fixed top-6 right-6 z-50">
          <UserButton afterSignOutUrl={"/"} />
        </div>

        <div className="min-h-screen p-10 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Everflow Hire ⚡ 5-Minute Hiring</h1>
            <div className="text-sm text-slate-400">
              AI sorting dashboard
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Stat title="Unreviewed" value={unreviewed.length} />
            <Stat title="Hired" value={hire.length} color="text-green-400" />
            <Stat title="Maybe" value={maybe.length} color="text-yellow-400" />
            <Stat title="Rejected" value={reject.length} color="text-red-400" />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-4 gap-6">

            {/* Unreviewed */}
            <Column title="Unreviewed" color="border-blue-500">
              {unreviewed.map((c) => (
                <Card key={c.id} c={c} onMove={move} />
              ))}
            </Column>

            {/* Hire */}
            <Column title="Hired" color="border-green-500">
              {hire.map((c) => (
                <Mini key={c.id} c={c} />
              ))}
            </Column>

            {/* Maybe */}
            <Column title="Maybe" color="border-yellow-500">
              {maybe.map((c) => (
                <Mini key={c.id} c={c} />
              ))}
            </Column>

            {/* Reject */}
            <Column title="Rejected" color="border-red-500">
              {reject.map((c) => (
                <Mini key={c.id} c={c} />
              ))}
            </Column>
          </div>
        </div>
      </SignedIn>
    </>
  );
}

// Components

function Stat({ title, value, color = "text-white" }: any) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Column({ title, children, color }: any) {
  return (
    <div className={`bg-slate-900 rounded-xl p-4 border ${color}`}>
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Card({ c, onMove }: any) {
  const scoreColor =
    c.score > 85 ? "text-green-400" : c.score > 70 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-white/10">
      <h3 className="font-semibold">{c.name}</h3>
      <p className="text-xs text-slate-400">{c.role}</p>
      <p className={`font-bold ${scoreColor}`}>AI Score: {c.score}</p>

      <div className="flex gap-2 mt-3">
        <button onClick={() => onMove(c, "hire")} className="flex-1 bg-green-600 p-1 rounded">Hire</button>
        <button onClick={() => onMove(c, "maybe")} className="flex-1 bg-yellow-600 p-1 rounded">Maybe</button>
        <button onClick={() => onMove(c, "reject")} className="flex-1 bg-red-600 p-1 rounded">Reject</button>
      </div>
    </div>
  );
}

function Mini({ c }: any) {
  return (
    <div className="bg-slate-800 p-2 rounded text-sm">
      {c.name} - {c.role}
    </div>
  );
}
