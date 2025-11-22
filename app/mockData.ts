export type CandidateStatus = "unreviewed" | "hire" | "maybe" | "reject";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
  experience: string;
  status: CandidateStatus;
}

export const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "Amelia Jones",
    role: "Product Designer",
    score: 92,
    skills: ["UX", "Figma", "Design Systems"],
    experience: "5 years",
    status: "unreviewed"
  },
  {
    id: "2",
    name: "Jack Taylor",
    role: "Senior Full-Stack Engineer",
    score: 87,
    skills: ["NodeJS", "React", "Postgres", "n8n"],
    experience: "6 years",
    status: "unreviewed"
  },
  {
    id: "3",
    name: "Liam Smith",
    role: "Customer Success Lead",
    score: 78,
    skills: ["CRM", "Onboarding", "B2B SaaS"],
    experience: "4 years",
    status: "unreviewed"
  },
  {
    id: "4",
    name: "Sophia Brown",
    role: "Sales Executive",
    score: 65,
    skills: ["Outbound", "Closing", "HubSpot"],
    experience: "3 years",
    status: "unreviewed"
  }
];
