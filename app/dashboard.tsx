"use client";

import React, { useMemo, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import StatsBar from "../StatsBar";
import UploadZone from "../UploadZone";
import CandidateCard from "../CandidateCard";
import DropColumn from "../DropColumn";
import { initialCandidates, Candidate } from "../mockData";

type Bucket = "hire" | "maybe" | "reject";

const JOB_TABS = [
  { id: "role-1", title: "Senior Product Engineer · Remote", active: true },
  { id: "role-2", title: "Account Executive · London", active: false },
  { id: "role-3", title: "Customer Success Lead · Hybrid", active: false },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();

  // === STATE ===============================================================
  const [activeJobId, setActiveJobId] = useState<string>("role-1");
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [hireBucket, setHireBucket] = useState<Candidate[]>([]);
  const [maybeBucket, setMaybeBucket] = useState<Candidate[]>([]);
  const [rejectBucket, setRejectBucket] = useState<Candidate[]>([]);

  // === HELPERS =============================================================

  const moveCandidateToBucket = (candidate: Candidate, bucket: Bucket) => {
    // Remove from all groups
    setCandidates((prev) => prev.filter((c) => c.id !== candidate.id));
    setHireBucket((prev) => prev.filter((c) => c.id !== candidate.id));
    setMaybeBucket((prev) => prev.filter((c) => c.id !== candidate.id));
    setRejectBucket((prev) => prev.filter((c) => c.id !== candidate.id));

    // Add to selected bucket
    if (bucket === "hire") setHireBucket((prev) => [...prev, candidate]);
    if (bucket === "maybe") setMaybeBucket((prev) => [...prev, candidate]);
    if (bucket === "reject") setRejectBucket((prev) => [...prev, candidate]);

    // 👇 Placeholder for future API call (n8n / Supabase / GHL)
    // fetch("/api/update-status", { method: "POST", body: JSON.stringify({ candidateId: candidate.id, bucket }) })
  };

  const handleDrop = (id: string, bucket: Bucket) => {
    const all = [...candidates, ...hireBucket, ...maybeBucket, ...rejectBucket];
    const found = all.find((c) => c.id === id);
    if (!found) return;
    moveCandidateToBucket(found, bucket);
  };

  const totalShortlisted = hireBucket.length + maybeBucket.length;

  const stats = useMemo(() => {
    const total = candidates.length + hireBucket.length + maybeBucket.length + rejectBucket.length || 1;
    const hireRate = Math.round((hireBucket.length / total) * 100);
    const shortlistRate = Math.round((totalShortlisted / total) * 100);
    const rejectRate = Math.round((rejectBucket.length / total) * 100);

    return {
      totalRoles: JOB_TABS.length,
      totalCandidates: total,
      hireRate,
      shortlistRate,
      rejectRate,
    };
  }, [candidates, hireBucket, maybeBucket, rejectBucket, totalShortlisted]);

  // === RENDER ==============================================================
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-slate-800 bg-slate-950/60">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
            EVERFLOW
          </div>
          <div className="mt-1 text-sm font-semibold">Hire Command Centre</div>
          <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/40 rounded-full px-2 py-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Live workspace
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 text-sm space-y-1">
          <button className="w-full flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800 text-slate-100">
            <span>Dashboard</span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/40">
              Active
            </span>
          </button>
          <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-900/80 text-slate-300">
            Jobs & Pipelines
          </button>
          <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-900/80 text-slate-300">
            Automations
          </button>
          <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-900/80 text-slate-300">
            CRM & Integrations
          </button>
          <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-900/80 text-slate-300">
            Team & Permissions
          </button>
          <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-900/80 text-slate-300">
            Settings & Billing
          </button>
        </nav>

        <div className="border-t border-slate-800 px-4 py-4 text-[11px] text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span>Pro trial</span>
            <span className="text-emerald-400 font-semibold">14 days left</span>
          </div>
          <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-sky-500 to-emerald-400" />
          </div>
          <button
            onClick={() => router.push("/pricing")}
            className="w-full mt-2 text-[11px] font-medium rounded-lg bg-sky-600 hover:bg-sky-700 py-1.5"
          >
            Upgrade to Agency Pro
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="border-b border-slate-800 bg-slate-950/60 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Everflow Hire
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-semibold">
                5-Minute AI Hiring Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-900 text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {stats.totalCandidates} candidates tracked
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Automate candidate scoring, shortlist in under 5 minutes, and sync
              decisions straight into your CRM.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
              <span className="font-medium text-slate-100">
                {user?.firstName ? `Hi, ${user.firstName}` : "Recruiter Workspace"}
              </span>
              <span>Plan: Pro Trial • {stats.totalRoles} active roles</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* TOP STATS + WORKFLOW BAR */}
        <section className="px-4 lg:px-8 pt-4 pb-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="w-full lg:w-auto">
              <StatsBar />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full lg:w-auto text-xs">
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-slate-400">Shortlist rate</div>
                <div className="text-sm font-semibold text-sky-400">
                  {stats.shortlistRate}%
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-slate-400">Hire rate</div>
                <div className="text-sm font-semibold text-emerald-400">
                  {stats.hireRate}%
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-slate-400">Rejection rate</div>
                <div className="text-sm font-semibold text-rose-400">
                  {stats.rejectRate}%
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-slate-400">Roles live</div>
                <div className="text-sm font-semibold text-slate-100">
                  {stats.totalRoles}
                </div>
              </div>
            </div>
          </div>

          {/* JOB SWITCHER */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {JOB_TABS.map((job) => (
              <button
                key={job.id}
                onClick={() => setActiveJobId(job.id)}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  activeJobId === job.id
                    ? "bg-sky-600 border-sky-500 text-white"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {job.title}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-full border border-dashed border-slate-600 text-slate-300 hover:bg-slate-900">
              + New role
            </button>
          </div>
        </section>

        {/* CORE GRID */}
        <section className="flex-1 px-4 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-5">
            {/* LEFT COLUMN – INPUTS + JOB META */}
            <div className="col-span-12 md:col-span-3 space-y-4">
              <UploadZone />

              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    Role snapshot
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
                    {activeJobId === "role-1" ? "Engineering" : "Pipeline"}
                  </span>
                </div>
                <div className="space-y-1 text-slate-400">
                  <div>Target shortlist: 5–8 candidates</div>
                  <div>Hiring manager: Sarah Mitchell</div>
                  <div>Channel: LinkedIn, Inbound, Everflow CRM</div>
                </div>
                <button className="w-full mt-2 rounded-lg border border-slate-700 hover:bg-slate-900 py-1.5 text-[11px]">
                  View full job brief
                </button>
              </div>

              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    Automation status
                  </span>
                  <span className="text-[10px] text-emerald-400">All live</span>
                </div>
                <div className="space-y-2 text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>CV scanner (n8n)</span>
                    <span className="text-emerald-400 text-[10px]">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CRM (GoHighLevel)</span>
                    <span className="text-emerald-400 text-[10px]">Synced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shortlist export</span>
                    <span className="text-emerald-400 text-[10px]">Ready</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/automations")}
                  className="w-full mt-2 rounded-lg bg-sky-600 hover:bg-sky-700 py-1.5 text-[11px]"
                >
                  Open automation centre
                </button>
              </div>
            </div>

            {/* MIDDLE COLUMN – RANKED CANDIDATES */}
            <div className="col-span-12 md:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">
                  Ranked candidates
                </span>
                <span className="text-slate-400">
                  {candidates.length} remaining to review
                </span>
              </div>

              {candidates.length === 0 && (
                <div className="border border-dashed border-slate-700 rounded-xl bg-slate-950/80 p-6 text-xs text-slate-400 text-center">
                  All candidates have been moved into Hire / Maybe / Reject.
                  <br />
                  <span className="text-slate-300">
                    Import more CVs or switch role from the top bar.
                  </span>
                </div>
              )}

              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onMove={(c, action) =>
                    moveCandidateToBucket(
                      c,
                      action === "hire"
                        ? "hire"
                        : action === "maybe"
                        ? "maybe"
                        : "reject"
                    )
                  }
                />
              ))}

              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  Tip: once you’re happy with this shortlist, click{" "}
                  <span className="text-slate-100 font-medium">
                    Export to CRM
                  </span>{" "}
                  to push to your interview pipeline.
                </span>
                <button className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-sky-500/60 text-sky-300 text-[11px] hover:bg-sky-500/10">
                  Export shortlist
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN – BUCKETS */}
            <div className="col-span-12 md:col-span-4 space-y-4">
              <DropColumn
                title="Hire"
                items={hireBucket}
                variant="hire"
                onDrop={(id) => handleDrop(id, "hire")}
              />
              <DropColumn
                title="Maybe"
                items={maybeBucket}
                variant="maybe"
                onDrop={(id) => handleDrop(id, "maybe")}
              />
              <DropColumn
                title="Reject"
                items={rejectBucket}
                variant="reject"
                onDrop={(id) => handleDrop(id, "reject")}
              />

              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">
                    Shortlist summary
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {totalShortlisted} shortlisted • {hireBucket.length} hires
                  </span>
                </div>
                <div className="space-y-1 text-slate-400">
                  <div>
                    Hire bucket is ideal for{" "}
                    <span className="text-slate-100">final interview</span>{" "}
                    stage.
                  </div>
                  <div>
                    Maybe bucket can be pushed into{" "}
                    <span className="text-slate-100">nurture campaigns</span>.
                  </div>
                  <div>
                    Reject bucket is logged for{" "}
                    <span className="text-slate-100">future roles</span>.
                  </div>
                </div>
                <button className="w-full mt-1 rounded-lg border border-slate-700 hover:bg-slate-900 py-1.5 text-[11px]">
                  Send decisions to CRM
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <footer className="border-t border-slate-800 bg-slate-950/80 px-4 lg:px-8 py-3 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Everflow Hire. Built for recruiters &
            hiring managers. Powered by AI.
          </div>
          <div className="flex flex-wrap gap-3">
            <span>n8n workflows: <span className="text-emerald-400">Live</span></span>
            <span>GoHighLevel sync: <span className="text-emerald-400">Connected</span></span>
            <span>API status: <span className="text-emerald-400">200 OK</span></span>
          </div>
        </footer>
      </main>
    </div>
  );
}
