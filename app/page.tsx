"use client";

import React, { useMemo, useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  Settings,
  Search,
  Star,
  Mail,
  Phone,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

type TabKey = "overview" | "candidates" | "jobs" | "analytics" | "settings";

type PipelineStage =
  | "Applied"
  | "Screening"
  | "Phone"
  | "Technical"
  | "Final"
  | "Offer"
  | "Hired";

type ExperienceLevel = "Junior" | "Mid" | "Senior" | "Lead";

type CandidateSource =
  | "LinkedIn"
  | "Indeed"
  | "Referral"
  | "Website"
  | "Agency";

interface Candidate {
  id: number;
  name: string;
  avatarColor: string;
  position: string;
  stage: PipelineStage;
  appliedAt: string;
  rating: number;
  nextAction?: string;
  nextActionDate?: string;
  location: string;
  experience: ExperienceLevel;
  skills: string[];
  source: CandidateSource;
  score: number;
  favorite?: boolean;
  archived?: boolean;
}

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  newApplicants: number;
  daysOpen: number;
  status: "Active" | "On Hold" | "Closed";
  stageCounts: Record<PipelineStage, number>;
}

interface Activity {
  id: number;
  type:
    | "application"
    | "interview_scheduled"
    | "interview_completed"
    | "offer_sent"
    | "offer_accepted"
    | "offer_declined";
  timestamp: string;
  candidate: string;
  position: string;
  stage?: PipelineStage;
}

interface Interview {
  id: number;
  candidate: string;
  position: string;
  type: string;
  time: string;
  interviewer: string;
}

interface RecruiterMetric {
  id: number;
  name: string;
  activeCandidates: number;
  interviews: number;
  timeToFill: number;
  satisfaction: number;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning";
}

const primaryBlue = "#3B82F6";
const successGreen = "#10B981";
const warningAmber = "#F59E0B";
const dangerRed = "#EF4444";
const neutralGrey = "#9CA3AF";

const pipelineOrder: PipelineStage[] = [
  "Applied",
  "Screening",
  "Phone",
  "Technical",
  "Final",
  "Offer",
  "Hired",
];

// -----------------------------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------------------------

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatarColor: "bg-blue-500",
    position: "Senior Frontend Engineer",
    stage: "Technical",
    appliedAt: "2025-11-01",
    rating: 5,
    nextAction: "Technical Interview",
    nextActionDate: "2025-11-23 14:00",
    location: "London",
    experience: "Senior",
    skills: ["React", "TypeScript", "Tailwind"],
    source: "LinkedIn",
    score: 92,
  },
  {
    id: 2,
    name: "Ben Carter",
    avatarColor: "bg-emerald-500",
    position: "Product Manager",
    stage: "Phone",
    appliedAt: "2025-10-28",
    rating: 4,
    nextAction: "PM Screen",
    nextActionDate: "2025-11-22 11:00",
    location: "Remote",
    experience: "Mid",
    skills: ["Product Discovery", "Roadmapping"],
    source: "Referral",
    score: 86,
  },
  {
    id: 3,
    name: "Chloe Smith",
    avatarColor: "bg-indigo-500",
    position: "Marketing Manager",
    stage: "Applied",
    appliedAt: "2025-11-18",
    rating: 3,
    location: "Manchester",
    experience: "Mid",
    skills: ["SEO", "Paid Ads"],
    source: "Indeed",
    score: 74,
  },
  {
    id: 4,
    name: "Daniel Park",
    avatarColor: "bg-pink-500",
    position: "Sales Executive",
    stage: "Offer",
    appliedAt: "2025-09-30",
    rating: 5,
    nextAction: "Offer Review",
    nextActionDate: "2025-11-21 16:00",
    location: "Bristol",
    experience: "Senior",
    skills: ["Outbound", "Negotiation"],
    source: "Website",
    score: 95,
  },
  {
    id: 5,
    name: "Emma Brown",
    avatarColor: "bg-sky-500",
    position: "UX Designer",
    stage: "Final",
    appliedAt: "2025-10-05",
    rating: 4,
    nextAction: "Final Interview",
    nextActionDate: "2025-11-24 10:30",
    location: "Remote",
    experience: "Senior",
    skills: ["Figma", "User Research"],
    source: "LinkedIn",
    score: 88,
  },
  {
    id: 6,
    name: "George Miller",
    avatarColor: "bg-amber-500",
    position: "Backend Engineer",
    stage: "Screening",
    appliedAt: "2025-11-15",
    rating: 3,
    location: "Birmingham",
    experience: "Junior",
    skills: ["Node.js", "PostgreSQL"],
    source: "Indeed",
    score: 70,
  },
  {
    id: 7,
    name: "Hannah Wilson",
    avatarColor: "bg-rose-500",
    position: "Data Analyst",
    stage: "Hired",
    appliedAt: "2025-08-10",
    rating: 5,
    location: "London",
    experience: "Mid",
    skills: ["SQL", "Looker"],
    source: "Referral",
    score: 93,
  },
  {
    id: 8,
    name: "Ian Thomas",
    avatarColor: "bg-lime-500",
    position: "Customer Success Manager",
    stage: "Phone",
    appliedAt: "2025-11-10",
    rating: 4,
    location: "Remote",
    experience: "Mid",
    skills: ["CS", "Onboarding"],
    source: "Website",
    score: 81,
  },
  {
    id: 9,
    name: "Julia Novak",
    avatarColor: "bg-cyan-500",
    position: "DevOps Engineer",
    stage: "Technical",
    appliedAt: "2025-10-20",
    rating: 4,
    location: "Remote",
    experience: "Senior",
    skills: ["AWS", "Terraform"],
    source: "LinkedIn",
    score: 89,
  },
  {
    id: 10,
    name: "Kevin Lee",
    avatarColor: "bg-fuchsia-500",
    position: "Sales Development Rep",
    stage: "Applied",
    appliedAt: "2025-11-17",
    rating: 3,
    location: "Leeds",
    experience: "Junior",
    skills: ["Cold Calling", "HubSpot"],
    source: "Indeed",
    score: 68,
  },
  {
    id: 11,
    name: "Laura Martinez",
    avatarColor: "bg-teal-500",
    position: "Content Marketer",
    stage: "Screening",
    appliedAt: "2025-11-12",
    rating: 4,
    location: "Remote",
    experience: "Mid",
    skills: ["Copywriting", "Email"],
    source: "Website",
    score: 80,
  },
  {
    id: 12,
    name: "Michael Green",
    avatarColor: "bg-purple-500",
    position: "QA Engineer",
    stage: "Technical",
    appliedAt: "2025-10-29",
    rating: 4,
    location: "Bristol",
    experience: "Mid",
    skills: ["Cypress", "Playwright"],
    source: "LinkedIn",
    score: 84,
  },
  {
    id: 13,
    name: "Natalie Young",
    avatarColor: "bg-red-500",
    position: "HR Generalist",
    stage: "Final",
    appliedAt: "2025-09-25",
    rating: 5,
    location: "London",
    experience: "Lead",
    skills: ["People Ops", "Employment Law"],
    source: "Referral",
    score: 91,
  },
  {
    id: 14,
    name: "Oliver Scott",
    avatarColor: "bg-slate-500",
    position: "Solutions Architect",
    stage: "Offer",
    appliedAt: "2025-09-18",
    rating: 5,
    location: "Remote",
    experience: "Lead",
    skills: ["Pre-sales", "Architecture"],
    source: "LinkedIn",
    score: 96,
  },
  {
    id: 15,
    name: "Priya Patel",
    avatarColor: "bg-yellow-500",
    position: "Growth Marketer",
    stage: "Phone",
    appliedAt: "2025-11-05",
    rating: 4,
    location: "Manchester",
    experience: "Senior",
    skills: ["Paid Social", "Analytics"],
    source: "Referral",
    score: 87,
  },
];

const initialJobs: JobPosting[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    applicants: 32,
    newApplicants: 4,
    daysOpen: 21,
    status: "Active",
    stageCounts: {
      Applied: 12,
      Screening: 8,
      Phone: 6,
      Technical: 4,
      Final: 1,
      Offer: 1,
      Hired: 0,
    },
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "London",
    type: "Full-time",
    applicants: 18,
    newApplicants: 2,
    daysOpen: 30,
    status: "Active",
    stageCounts: {
      Applied: 6,
      Screening: 4,
      Phone: 3,
      Technical: 3,
      Final: 1,
      Offer: 1,
      Hired: 0,
    },
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    applicants: 24,
    newApplicants: 3,
    daysOpen: 16,
    status: "On Hold",
    stageCounts: {
      Applied: 10,
      Screening: 6,
      Phone: 4,
      Technical: 2,
      Final: 1,
      Offer: 1,
      Hired: 0,
    },
  },
  {
    id: 4,
    title: "Sales Executive",
    department: "Sales",
    location: "Bristol",
    type: "Full-time",
    applicants: 15,
    newApplicants: 1,
    daysOpen: 40,
    status: "Active",
    stageCounts: {
      Applied: 5,
      Screening: 4,
      Phone: 3,
      Technical: 1,
      Final: 1,
      Offer: 1,
      Hired: 0,
    },
  },
  {
    id: 5,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    applicants: 14,
    newApplicants: 2,
    daysOpen: 10,
    status: "Active",
    stageCounts: {
      Applied: 6,
      Screening: 4,
      Phone: 2,
      Technical: 1,
      Final: 1,
      Offer: 0,
      Hired: 0,
    },
  },
  {
    id: 6,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Birmingham",
    type: "Full-time",
    applicants: 20,
    newApplicants: 3,
    daysOpen: 25,
    status: "Active",
    stageCounts: {
      Applied: 8,
      Screening: 5,
      Phone: 3,
      Technical: 2,
      Final: 1,
      Offer: 1,
      Hired: 0,
    },
  },
  {
    id: 7,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    applicants: 11,
    newApplicants: 1,
    daysOpen: 7,
    status: "Active",
    stageCounts: {
      Applied: 5,
      Screening: 3,
      Phone: 2,
      Technical: 0,
      Final: 1,
      Offer: 0,
      Hired: 0,
    },
  },
  {
    id: 8,
    title: "Data Analyst",
    department: "Data",
    location: "London",
    type: "Full-time",
    applicants: 17,
    newApplicants: 2,
    daysOpen: 35,
    status: "Active",
    stageCounts: {
      Applied: 7,
      Screening: 5,
      Phone: 3,
      Technical: 1,
      Final: 1,
      Offer: 0,
      Hired: 0,
    },
  },
];

const activities: Activity[] = [
  {
    id: 1,
    type: "application",
    timestamp: "10 mins ago",
    candidate: "Chloe Smith",
    position: "Marketing Manager",
  },
  {
    id: 2,
    type: "interview_scheduled",
    timestamp: "30 mins ago",
    candidate: "Emma Brown",
    position: "UX Designer",
    stage: "Final",
  },
  {
    id: 3,
    type: "offer_sent",
    timestamp: "1 hour ago",
    candidate: "Daniel Park",
    position: "Sales Executive",
    stage: "Offer",
  },
  {
    id: 4,
    type: "offer_accepted",
    timestamp: "3 hours ago",
    candidate: "Hannah Wilson",
    position: "Data Analyst",
    stage: "Hired",
  },
];

const upcomingInterviews: Interview[] = [
  {
    id: 1,
    candidate: "Alice Johnson",
    position: "Senior Frontend Engineer",
    type: "Technical Interview",
    time: "Today · 14:00",
    interviewer: "James (Engineering Manager)",
  },
  {
    id: 2,
    candidate: "Ben Carter",
    position: "Product Manager",
    type: "Hiring Manager",
    time: "Today · 16:30",
    interviewer: "Sarah (Head of Product)",
  },
  {
    id: 3,
    candidate: "Emma Brown",
    position: "UX Designer",
    type: "Final Panel",
    time: "Tomorrow · 10:00",
    interviewer: "Design Panel",
  },
  {
    id: 4,
    candidate: "Daniel Park",
    position: "Sales Executive",
    type: "Offer Discussion",
    time: "Tomorrow · 15:00",
    interviewer: "Tom (Sales Director)",
  },
  {
    id: 5,
    candidate: "Priya Patel",
    position: "Growth Marketer",
    type: "Phone Screen",
    time: "In 3 days · 11:30",
    interviewer: "Rebecca (Marketing Lead)",
  },
];

const recruiterMetrics: RecruiterMetric[] = [
  {
    id: 1,
    name: "Alex",
    activeCandidates: 32,
    interviews: 18,
    timeToFill: 29,
    satisfaction: 4.6,
  },
  {
    id: 2,
    name: "Bianca",
    activeCandidates: 27,
    interviews: 22,
    timeToFill: 24,
    satisfaction: 4.8,
  },
  {
    id: 3,
    name: "Chris",
    activeCandidates: 19,
    interviews: 14,
    timeToFill: 33,
    satisfaction: 4.2,
  },
];

const hiringTrendData = [
  { month: "Jun", applications: 120, interviews: 45, hires: 12 },
  { month: "Jul", applications: 140, interviews: 55, hires: 15 },
  { month: "Aug", applications: 160, interviews: 60, hires: 18 },
  { month: "Sep", applications: 150, interviews: 58, hires: 16 },
  { month: "Oct", applications: 170, interviews: 65, hires: 20 },
  { month: "Nov", applications: 180, interviews: 72, hires: 22 },
];

const sourceOfHireData = [
  { name: "LinkedIn", value: 40 },
  { name: "Indeed", value: 25 },
  { name: "Referral", value: 20 },
  { name: "Website", value: 10 },
  { name: "Agency", value: 5 },
];

const departmentDistributionData = [
  { name: "Engineering", open: 6 },
  { name: "Product", open: 3 },
  { name: "Marketing", open: 4 },
  { name: "Sales", open: 5 },
  { name: "Design", open: 3 },
  { name: "Data", open: 2 },
];

const pieColours = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#EC4899",
  "#22C55E",
];

// -----------------------------------------------------------------------------
// SMALL COMPONENTS
// -----------------------------------------------------------------------------

const StatCard: React.FC<{
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "flat";
}> = ({ label, value, sub, trend }) => {
  const trendIcon =
    trend === "up"
      ? ArrowUpRight
      : trend === "down"
      ? ArrowDownRight
      : ArrowRight;
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
      ? "text-rose-400"
      : "text-slate-400";
  const Icon = trendIcon;

  return (
    <div className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-50">{value}</span>
        {sub && (
          <span className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <Icon className="h-3 w-3" />
            {sub}
          </span>
        )}
      </div>
    </div>
  );
};

const Badge: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
  >
    {children}
  </span>
);

// -----------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [candidates, setCandidates] =
    useState<Candidate[]>(initialCandidates);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);

  const [candidateView, setCandidateView] = useState<"table" | "grid">(
    "table",
  );
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>(
    [],
  );
  const [candidateSearch, setCandidateSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "All">(
    "All",
  );
  const [positionFilter, setPositionFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<CandidateSource | "All">(
    "All",
  );
  const [expFilter, setExpFilter] = useState<ExperienceLevel | "All">(
    "All",
  );
  const [ratingFilter, setRatingFilter] = useState<number | "All">("All");

  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<
    | "profile"
    | "application"
    | "timeline"
    | "documents"
    | "notes"
    | "scorecard"
    | "communication"
  >("profile");
  const [activeCandidate, setActiveCandidate] =
    useState<Candidate | null>(null);

  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [settingsCompanyName, setSettingsCompanyName] =
    useState("Everflow AI Recruitment");
  const [settingsTimezone, setSettingsTimezone] =
    useState("Europe/London");

  // ---------------------------------------------------------------------------
  // DERIVED DATA
  // ---------------------------------------------------------------------------

  const pipelineStats = useMemo(() => {
    const stageCounts: Record<PipelineStage, number> = {
      Applied: 0,
      Screening: 0,
      Phone: 0,
      Technical: 0,
      Final: 0,
      Offer: 0,
      Hired: 0,
    };
    candidates.forEach((c) => {
      if (!c.archived) {
        stageCounts[c.stage] += 1;
      }
    });
    const total = Object.values(stageCounts).reduce(
      (sum, v) => sum + v,
      0,
    );
    let running = 0;
    const stages = pipelineOrder.map((stage) => {
      const count = stageCounts[stage];
      const conv =
        running === 0 ? 100 : Math.round((count / running) * 100) || 0;
      running = count;
      return { stage
