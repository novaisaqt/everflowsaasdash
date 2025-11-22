export interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
}

export const initialCandidates: Candidate[] = [
  {
    id: "cand1",
    name: "Amelia Jones",
    role: "Product Designer",
    score: 92,
    skills: ["UX", "UI", "Figma", "Design systems"]
  },
  {
    id: "cand2",
    name: "Jack Taylor",
    role: "Senior Full Stack Engineer",
    score: 87,
    skills: ["React", "Node", "Postgres", "GHL"]
  },
  {
    id: "cand3",
    name: "Liam Smith",
    role: "Customer Success",
    score: 78,
    skills: ["CRM", "Onboarding", "B2B"]
  },
  {
    id: "cand4",
    name: "Sophia Brown",
    role: "Sales Executive",
    score: 65,
    skills: ["Outbound", "Closing", "Hubspot"]
  }
];
