export type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
  experience: string;
};

export const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "Amelia Jones",
    role: "Product Designer",
    experience: "5 years",
    score: 92,
    skills: ["UX", "UI", "Figma", "Design Systems"],
  },
  {
    id: "2",
    name: "Jack Taylor",
    role: "Senior Full Stack Engineer",
    experience: "6 years",
    score: 87,
    skills: ["React", "Node", "PostgreSQL", "GHL"],
  },
  {
    id: "3",
    name: "Liam Smith",
    role: "Customer Success Lead",
    experience: "4 years",
    score: 78,
    skills: ["CRM", "Onboarding", "SaaS"],
  },
  {
    id: "4",
    name: "Sophia Brown",
    role: "Sales Executive",
    experience: "3 years",
    score: 65,
    skills: ["Outbound", "Closing", "HubSpot"],
  },
];
