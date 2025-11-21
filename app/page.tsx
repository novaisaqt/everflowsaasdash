"use client"

import { useState } from "react"
import {
  BarChart3,
  Briefcase,
  Users,
  CalendarCheck,
  Bell,
  Moon,
  Sun,
  LayoutDashboard,
  UserCircle,
  ArrowUpRight
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const trendData = [
  { name: "May", hires: 7 },
  { name: "Jun", hires: 9 },
  { name: "Jul", hires: 14 },
  { name: "Aug", hires: 12 },
  { name: "Sep", hires: 18 },
  { name: "Oct", hires: 24 },
]

export default function RecruitmentDashboard() {
  const [dark, setDark] = useState(true)

  return (
    <div className={`${dark ? "bg-[#0F172A]" : "bg-gray-100"} min-h-screen text-white`}>

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-blue-400" />
          <span className="font-bold text-xl">Everflow AI</span>
        </div>

        <div className="flex items-center gap-6">
          <Bell className="w-5 h-5" />
          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <UserCircle className="w-8 h-8" />
        </div>
      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-[250px] bg-[#020617] min-h-screen p-5 border-r border-gray-700 hidden lg:block">

          <div className="space-y-5">

            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-400" />
              <span>Jobs</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-green-400" />
              <span>Candidates</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarCheck className="text-yellow-400" />
              <span>Interviews</span>
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 className="text-purple-400" />
              <span>Analytics</span>
            </div>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 space-y-6">

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-4 gap-6">

            <StatCard title="Active Jobs" value="24" percent="+12%" />
            <StatCard title="Total Candidates" value="418" percent="+24%" />
            <StatCard title="Interviews" value="52" percent="+18%" />
            <StatCard title="Hires This Month" value="17" percent="+30%" />

          </div>

          {/* CHART */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-700">
            <h2 className="text-lg mb-4 font-semibold">Hiring Trend</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="hires" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ACTIVITY TABLE */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-700">
            <h2 className="text-lg mb-4 font-semibold">Recent Candidate Activity</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Role</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>

                <Row name="Ryan Collins" job="Frontend Developer" status="Interview" />
                <Row name="Sarah Moore" job="UI Designer" status="Offer Sent" />
                <Row name="Tom Bradley" job="Backend Dev" status="Screening" />
                <Row name="Alex Byrne" job="Marketing Exec" status="Hired" />

              </tbody>
            </table>
          </div>

        </main>

      </div>

    </div>
  )
}

function StatCard({ title, value, percent }: { title: string, value: string, percent: string }) {
  return (
    <div className="bg-[#020617] p-5 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <span className="text-green-400 flex items-center text-sm">
          {percent} <ArrowUpRight className="w-4 h-4 ml-1" />
        </span>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

function Row({ name, job, status }: { name: string, job: string, status: string }) {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
      <td className="py-2">{name}</td>
      <td className="py-2">{job}</td>
      <td className="py-2 text-blue-400">{status}</td>
    </tr>
  )
}
