"use client"

import { useState } from "react"
import { Bell, User, Briefcase, Users, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", applications: 40, interviews: 24, hires: 4 },
  { month: "Feb", applications: 55, interviews: 30, hires: 6 },
  { month: "Mar", applications: 70, interviews: 45, hires: 8 },
  { month: "Apr", applications: 90, interviews: 60, hires: 12 },
  { month: "May", applications: 110, interviews: 75, hires: 18 },
  { month: "Jun", applications: 130, interviews: 90, hires: 24 }
]

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? "bg-[#0f172a] text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Everflow Recruitment</h1>

        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 border rounded">
            {darkMode ? "Light" : "Dark"}
          </button>

          <Bell className="w-5 h-5" />
          <User className="w-6 h-6 rounded-full border p-1" />
        </div>
      </header>

      <main className="p-6 grid gap-6 grid-cols-1 lg:grid-cols-4">

        {/* KPI Cards */}
        <div className="bg-[#3B82F6] text-white rounded-xl p-5">
          <p className="text-sm">Active Jobs</p>
          <h2 className="text-3xl font-bold">8</h2>
        </div>

        <div className="bg-[#10B981] text-white rounded-xl p-5">
          <p className="text-sm">Candidates</p>
          <h2 className="text-3xl font-bold">127</h2>
        </div>

        <div className="bg-[#F59E0B] text-white rounded-xl p-5">
          <p className="text-sm">Interviews</p>
          <h2 className="text-3xl font-bold">14</h2>
        </div>

        <div className="bg-[#EF4444] text-white rounded-xl p-5">
          <p className="text-sm">Offers</p>
          <h2 className="text-3xl font-bold">5</h2>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-[#1e293b] col-span-1 lg:col-span-4 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Hiring Pipeline Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 col-span-1 lg:col-span-2">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm">
            <li>✅ Sarah applied for Frontend Developer</li>
            <li>📞 James scheduled phone screen</li>
            <li>📩 Offer sent to Olivia</li>
          </ul>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 col-span-1 lg:col-span-2">
          <h3 className="font-bold mb-4">Upcoming Interviews</h3>
          <ul className="space-y-3 text-sm">
            <li>10:00am – John (Engineering)</li>
            <li>12:30pm – Amy (Marketing)</li>
            <li>3:00pm – Chris (Sales)</li>
          </ul>
        </div>

      </main>
    </div>
  )
}
