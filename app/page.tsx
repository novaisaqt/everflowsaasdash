import React, { useState, useMemo } from "react";
import { Bell, Moon, Sun, User, Briefcase, Users, Calendar, CheckCircle2, BarChart2, Settings, Search, Filter, Plus, Mail, MoveRight, X, ChevronDown, ChevronRight } from "lucide-react";
import { LineChart, Line, PieChart, Pie, BarChart as RBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// --- MOCK DATA ---
const STAGES = ["Applications", "Screening", "Phone", "Technical", "Final", "Offer", "Hired"];
const SOURCES = ["LinkedIn", "Indeed", "Referral", "Website", "Other"];

const sampleCandidates = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: `Candidate ${i + 1}`,
  position: ["Frontend Dev", "Backend Dev", "Sales Exec", "Designer"][i % 4],
  stage: STAGES[i % STAGES.length],
  rating: (i % 5) + 1,
  source: SOURCES[i % SOURCES.length],
  date: new Date(2025, 0, i + 5).toDateString(),
}));

const sampleJobs = [
  { title: "Frontend Developer", dept: "Engineering", applicants: 12, status: "Active" },
  { title: "Sales Manager", dept: "Sales", applicants: 8, status: "Active" },
  { title: "UI Designer", dept: "Design", applicants: 5, status: "On Hold" },
  { title: "Product Manager", dept: "Product", applicants: 9, status: "Active" },
];

const trendData = [
  { name: "Mar", apps: 30, interviews: 10, hires: 3 },
  { name: "Apr", apps: 40, interviews: 15, hires: 5 },
  { name: "May", apps: 60, interviews: 25, hires: 7 },
  { name: "Jun", apps: 80, interviews: 30, hires: 9 },
  { name: "Jul", apps: 90, interviews: 35, hires: 11 },
];

// --- COMPONENT ---
export default function RecruitmentDashboard() {
  const [tab, setTab] = useState("Overview");
  const [dark, setDark] = useState(true);
  const [stageFilter, setStageFilter] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = useMemo(() => {
    if (!stageFilter) return sampleCandidates;
    return sampleCandidates.filter(c => c.stage === stageFilter);
  }, [stageFilter]);

  return (
    <div className={`${dark ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"} min-h-screen flex`}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-4 bg-black/30 space-y-6">
        <h2 className="text-xl font-bold">Everflow AI</h2>
        <div className="space-y-2">
          <SidebarStat label="Active Jobs" value="8" icon={<Briefcase />} />
          <SidebarStat label="Candidates" value="15" icon={<Users />} />
          <SidebarStat label="Interviews" value="5" icon={<Calendar />} />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-white/10">
          <nav className="flex gap-6">
            {['Overview','Candidates','Jobs','Analytics','Settings'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`hover:text-blue-400 ${tab===t && 'text-blue-400'}`}>{t}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button><Bell /></button>
            <button onClick={() => setDark(!dark)}>{dark ? <Sun/> : <Moon/>}</button>
            <User />
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          {tab === "Overview" && <Overview tabSetter={setStageFilter} />}
          {tab === "Candidates" && <Candidates list={filteredCandidates} setSelected={setSelectedCandidate} />}
          {tab === "Jobs" && <Jobs />}
          {tab === "Analytics" && <Analytics />}
          {tab === "Settings" && <SettingsPanel />}
        </main>

        {selectedCandidate && <CandidateModal candidate={selectedCandidate} onClose={()=>setSelectedCandidate(null)} />}
      </div>
    </div>
  );
}

// --- Sub Components ---
function SidebarStat({label,value,icon}){
  return(
    <div className="flex items-center gap-2 p-3 bg-white/5 rounded">
      {icon}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  )
}

function Overview({tabSetter}){
  return(
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {STAGES.map(stage => (
          <button key={stage} onClick={()=>tabSetter(stage)} className="p-4 rounded bg-white/5 hover:bg-blue-500/20">{stage}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="apps" stroke="#3b82f6" />
            <Line dataKey="hires" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Candidates({list,setSelected}){
  return(
    <div>
      <h1 className="text-2xl mb-4">Candidates</h1>
      <table className="w-full text-left">
        <thead><tr><th>Name</th><th>Position</th><th>Stage</th><th>Rating</th><th></th></tr></thead>
        <tbody>
          {list.map(c=> (
            <tr key={c.id} className="border-t border-white/10">
              <td>{c.name}</td>
              <td>{c.position}</td>
              <td>{c.stage}</td>
              <td>{"⭐".repeat(c.rating)}</td>
              <td><button onClick={()=>setSelected(c)} className="text-blue-400">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Jobs(){
  return(
    <div>
      <h1 className="text-2xl mb-4 flex justify-between">Jobs <button className="bg-blue-500 px-3 py-1 rounded flex items-center gap-1"><Plus size={16}/>New</button></h1>
      <div className="grid md:grid-cols-3 gap-4">
        {sampleJobs.map((j,i)=> (
          <div key={i} className="p-4 bg-white/5 rounded space-y-2">
            <h2 className="font-bold">{j.title}</h2>
            <p>{j.dept}</p>
            <p>Applicants: {j.applicants}</p>
            <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Analytics(){
  return(
    <div>
      <h1 className="text-2xl mb-6">Analytics</h1>
      <ResponsiveContainer width="100%" height={300}>
        <RBarChart data={trendData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="apps" fill="#3b82f6" />
        </RBarChart>
      </ResponsiveContainer>
    </div>
  )
}

function SettingsPanel(){
  return(
    <div className="space-y-4">
      <h1 className="text-2xl">Settings</h1>
      <input className="p-2 bg-white/10 w-full" placeholder="Company name" />
      <textarea className="p-2 bg-white/10 w-full" placeholder="Email template..." />
    </div>
  )
}

function CandidateModal({candidate,onClose}){
  return(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#0f172a] p-6 rounded w-full max-w-lg space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{candidate.name}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <p>Position: {candidate.position}</p>
        <p>Stage: {candidate.stage}</p>
        <p>Source: {candidate.source}</p>
        <p>Applied: {candidate.date}</p>
        <button className="bg-green-500 px-3 py-1 rounded">Move Stage</button>
      </div>
    </div>
  )
}
