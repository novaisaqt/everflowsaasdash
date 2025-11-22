// app/dashboard/page.tsx
"use client";


import React, { useState } from "react";
import StatsBar from "./StatsBar";


type CandidateStatus = "unreviewed" | "hire" | "maybe" | "reject";

interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
  experience: string;
  status: CandidateStatus;
}

const initialCandidates: Candidate[] = [
  {
    id: "CAND-28721",
    name: "Jack Taylor",
    role: "Senior Full-Stack Engineer",
    score: 87,
    skills: ["React", "Node.js", "PostgreSQL", "GHL", "n8n"],
    experience: "6 years",
    status: "unreviewed",
  },
  {
    id: "CAND-28722",
    name: "Amelia Jones",
    role: "Product Designer",
    score: 92,
    skills: ["UX", "UI", "Figma", "Design Systems"],
    experience: "5 years",
    status: "unreviewed",
  },
  {
    id: "CAND-28723",
    name: "Liam Smith",
    role: "Customer Success Lead",
    score: 78,
    skills: ["CRM", "Onboarding", "B2B SaaS"],
    experience: "4 years",
    status: "unreviewed",
  },
  {
    id: "CAND-28724",
    name: "Sophia Brown",
    role: "Sales Executive",
    score: 65,
    skills: ["Outbound", "Closing", "HubSpot"],
    experience: "3 years",
    status: "unreviewed",
  },
];

const statusColors: Record<Exclude<CandidateStatus, "unreviewed">, string> = {
  hire: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  maybe: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  reject: "bg-rose-500/15 text-rose-300 border-rose-500/40",
};

const scoreColor = (score: number) => {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-300";
  return "text-rose-300";
};

const stepClasses = (active: boolean) =>
  [
    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium",
    active
      ? "border-sky-400 bg-sky-500/10 text-sky-100"
      : "border-slate-600 bg-slate-900/50 text-slate-300",
  ].join(" ");

const DashboardPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const moveCandidate = (id: string, status: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const unreviewed = candidates.filter((c) => c.status === "unreviewed");
  const hire = candidates.filter((c) => c.status === "hire");
  const maybe = candidates.filter((c) => c.status === "maybe");
  const reject = candidates.filter((c) => c.status === "reject");

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:px-8 lg:py-8">
        {/* TOP BAR */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/40">
              <span className="text-lg font-bold text-sky-400">EH</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Everflow Hire
              </div>
              <h1 className="text-sm font-medium text-slate-100">
                5-Minute AI Hiring Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Job summary */}
            <div className="hidden flex-col text-right text-xs sm:flex">
              <span className="text-slate-400">Active role</span>
              <span className="text-slate-100">
                Senior Product Engineer · Remote UK
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-slate-400">Time to shortlist</span>
              <span className="text-slate-200">05:00</span>
            </div>
          </div>
        </header>

        {/* STEP PROGRESS */}
        <section className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Workflow:</span>
            <div className="flex flex-wrap gap-2">
              <div className={stepClasses(true)}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                1. Job
              </div>
              <div className={stepClasses(true)}>2. CVs</div>
              <div className={stepClasses(true)}>3. AI Scan</div>
              <div className={stepClasses(false)}>4. Shortlist</div>
              <div className={stepClasses(false)}>5. Hire</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            Target: shortlist agreed & interviews booked in under 5 minutes
          </div>
        </section>

        {/* MAIN GRID */}
        <main className="grid flex-1 gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.4fr)_minmax(0,1.1fr)]">
          {/* LEFT: ACTION PANEL */}
          <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                1. Inputs
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Add the job and candidate CVs. Everflow will handle the scoring
                and ranking.
              </p>
            </div>

            <button className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-left text-xs font-medium text-slate-100 hover:border-sky-500 hover:bg-slate-900/90">
              <div className="flex items-center justify-between">
                <span>Upload job description</span>
                <span className="text-[10px] text-sky-300">.pdf · .docx · text</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Paste or upload an existing JD. AI will extract requirements and
                must-haves.
              </p>
            </button>

            <button className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-left text-xs font-medium text-slate-100 hover:border-sky-500 hover:bg-slate-900/90">
              <div className="flex items-center justify-between">
                <span>Upload candidate CVs</span>
                <span className="text-[10px] text-sky-300">
                  Drag &amp; drop · bulk import
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Send CVs from your inbox, job boards or database straight into
                the scanner.
              </p>
            </button>

            <button className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-2 text-left text-xs font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.6)] hover:brightness-110">
              <div className="flex items-center justify-between">
                <span>Run AI scoring</span>
                <span className="text-[10px] text-sky-100">
                  Instant ranking in under 60 seconds
                </span>
              </div>
            </button>

            <div className="mt-2 rounded-xl bg-slate-900/70 p-3 text-[11px] text-slate-400">
              <p className="font-medium text-slate-300">
                Live status: <span className="text-emerald-400">Ready</span>
              </p>
              <p className="mt-1">
                Once scoring is complete, candidates appear in the centre panel
                ranked by fit.
              </p>
            </div>
          </section>

          {/* CENTER: RESULTS LIST */}
          <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  2. Ranked candidates
                </h2>
                <p className="text-xs text-slate-400">
                  Highest-scoring candidates at the top. Move them into Hire,
                  Maybe or Reject.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>
                  Total:{" "}
                  <span className="font-semibold text-slate-100">
                    {candidates.length}
                  </span>
                </span>
                <span className="hidden sm:inline">
                  Shortlisted:{" "}
                  <span className="font-semibold text-emerald-400">
                    {hire.length}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {unreviewed.length === 0 && (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-xs text-slate-500">
                  All candidates have been reviewed. Adjust statuses in the
                  right panel.
                </div>
              )}

              {unreviewed
                .sort((a, b) => b.score - a.score)
                .map((candidate) => (
                  <article
                    key={candidate.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-50">
                          {candidate.name}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {candidate.role} • {candidate.experience}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-semibold ${scoreColor(
                            candidate.score
                          )}`}
                        >
                          {candidate.score}%
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Match score
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => moveCandidate(candidate.id, "hire")}
                          className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40 hover:bg-emerald-500/25"
                        >
                          ✓ Move to Hire
                        </button>
                        <button
                          onClick={() => moveCandidate(candidate.id, "maybe")}
                          className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-200 ring-1 ring-amber-500/40 hover:bg-amber-500/25"
                        >
                          ? Move to Maybe
                        </button>
                        <button
                          onClick={() => moveCandidate(candidate.id, "reject")}
                          className="rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-semibold text-rose-200 ring-1 ring-rose-500/40 hover:bg-rose-500/25"
                        >
                          ✕ Reject
                        </button>
                      </div>

                      <button className="rounded-full border border-sky-500/50 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-100 hover:bg-sky-500/20">
                        Book interview
                      </button>
                    </div>
                  </article>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <button className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                  Export shortlist (.csv)
                </button>
                <button className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
                  Sync to CRM (GHL)
                </button>
              </div>
              <span>Changes are autosaved for this role.</span>
            </div>
          </section>

          {/* RIGHT: KANBAN BUCKETS */}
          <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
            <h2 className="px-1 text-sm font-semibold text-slate-100">
              3. Shortlist buckets
            </h2>

            <div className="grid flex-1 grid-rows-3 gap-3">
              {/* HIRE */}
              <div className="flex flex-col rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-2">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-emerald-300">
                  <span>Hire ({hire.length})</span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                  {hire.length === 0 && (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-emerald-500/50 bg-emerald-500/5 text-[11px] text-emerald-200/70">
                      Move your best-fit candidates here.
                    </div>
                  )}
                  {hire.map((c) => (
                    <BucketChip key={c.id} candidate={c} />
                  ))}
                </div>
              </div>

              {/* MAYBE */}
              <div className="flex flex-col rounded-xl border border-amber-500/40 bg-amber-500/5 p-2">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-amber-200">
                  <span>Maybe ({maybe.length})</span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                  {maybe.length === 0 && (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 text-[11px] text-amber-100/80">
                      Unsure? Park candidates here.
                    </div>
                  )}
                  {maybe.map((c) => (
                    <BucketChip key={c.id} candidate={c} />
                  ))}
                </div>
              </div>

              {/* REJECT */}
              <div className="flex flex-col rounded-xl border border-rose-500/40 bg-rose-500/5 p-2">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-rose-200">
                  <span>Reject ({reject.length})</span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                  {reject.length === 0 && (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-rose-500/50 bg-rose-500/5 text-[11px] text-rose-100/80">
                      Rejected candidates are logged, not lost.
                    </div>
                  )}
                  {reject.map((c) => (
                    <BucketChip key={c.id} candidate={c} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const BucketChip: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-950/70 px-2 py-1 text-[11px] text-slate-100">
      <div className="flex flex-col">
        <span className="font-semibold">{candidate.name}</span>
        <span className="text-[10px] text-slate-400">
          {candidate.role.split("·")[0]}
        </span>
      </div>
      <span
        className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${scoreColor(
          candidate.score
        )}`}
      >
        {candidate.score}%
      </span>
    </div>
  );
};

export default DashboardPage;
