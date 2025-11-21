'use client'  

import { useState } from "react"
import { 
  Users, 
  Briefcase, 
  CalendarCheck, 
  TrendingUp,
  Bell,
  Moon,
  Sun,
  Search
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const stats = [
  { name: "Active Jobs", value: 24, icon: Briefcase },
  { name: "Candidates", value: 186, icon: Users },
  { name: "Interviews", value: 42, icon: CalendarCheck },
  { name: "Hired", value: 18, icon: TrendingUp }
]

const hiringData = [
  { month: "May", applications: 120, hires: 6 },
  { month: "Jun", applications: 140, hires: 8 },
  { month: "Jul", applications: 170, hires: 10 },
  { month: "Aug", applications: 150, hires: 7 },
  { month: "Sep", applications: 190, hires: 12 },
  { month: "Oct", applications: 220, hires: 15 }
]

const sourceData = [
  { name: "LinkedIn", value: 45 },
  { name: "Indeed", value: 30 },
  { name: "Referral", value: 15 },
  { name: "Website", value: 10 }
]

const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]

export default function Dashboard() {
  const [dark, setDark] = useState(false)

  return (
    <div className={`${dark ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-all duration-500`}>

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">

        <h1 className="text-xl font-bold">
          Everflow Recruitment
        </h1>

        <div className="flex items-center gap-6">

          {dark ? (
            <Sun onClick={() => setDark(false)} className="cursor-pointer" />
          ) : (
            <Moon onClick={() => setDark(true)} className="cursor-pointer" />
          )}

          <div className="relative">
            <Bell />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </div>

          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            B
          </div>
        </div>
      </header>

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 p-6 border-r border-gray-200 dark:border-gray-700 hidden md:block">

          <div className="space-y-4">

            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow"
                >
                  <Icon />
                  <div>
                    <p className="text-sm">{stat.name}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              )
            })}

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6 space-y-6">

          {/* SEARCH BAR */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl">
            <Search />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="bg-transparent outline-none w-full"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LINE CHART */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Hiring Trends</h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="hires"
                    stroke="#10B981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            {/* PIE CHART */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Source of Hire</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {sourceData.map((_, index) => (
                      <Cell key={index} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* CANDIDATES TABLE */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

            <h2 className="font-bold mb-4">Recent Candidates</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Position</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sarah Jones", "Frontend Dev", "Interview", "⭐⭐⭐⭐"],
                  ["Mike Hall", "Sales Rep", "Offer", "⭐⭐⭐"],
                  ["Emily Chen", "Designer", "Screening", "⭐⭐⭐⭐⭐"],
                  ["Alex Smith", "Backend Dev", "Hired", "⭐⭐⭐⭐"]
                ].map((c, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <td className="p-2">{c[0]}</td>
                    <td className="p-2">{c[1]}</td>
                    <td className="p-2">{c[2]}</td>
                    <td className="p-2">{c[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </main>

      </div>

    </div>
  )
}
