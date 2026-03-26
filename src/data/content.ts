// Centralized content data for all portfolio sections
// Single source of truth — all section components import from here

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const heroTitles = ["Cloud Developer", "Solution Architect", "Full Stack Developer"] as const;
export const heroTagline = "I make tech work harder so you don't have to";

// ---------------------------------------------------------------------------
// How I Build — Manifesto Statements
// ---------------------------------------------------------------------------

export const howIBuildStatements = [
  "Good architecture is a series of quiet bets on the future — each one earning trust the moment requirements shift.",
  "Ship small, verify early, compound gains. The best systems aren't designed in a single pass — they're grown through disciplined iteration.",
  "Security and simplicity aren't at odds. The most resilient code is the code that never needed to be clever.",
] as const;

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly oneLiner: string;
  readonly techStack: readonly string[];
  readonly keyAchievement: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly lat: number;
    readonly lng: number;
  };
}

export const experiences: readonly Experience[] = [
  {
    company: "Propwise",
    role: "Full Stack Engineer",
    period: "2025 - Present",
    oneLiner:
      "Designing secure, versioned REST APIs for financial reporting with RBAC and event-driven workflows.",
    techStack: ["Node.js", "PostgreSQL", "AWS", "TypeScript"],
    keyAchievement:
      "Designed event-driven RBAC system handling 50+ permission rules",
    location: { city: "Dubai", country: "UAE", lat: 25.20, lng: 55.27 },
  },
  {
    company: "Outlier AI",
    role: "ML Developer (Contract)",
    period: "2024 - 2025",
    oneLiner:
      "Evaluating and improving LLM code-generation quality through structured technical review.",
    techStack: ["Python", "LLMs", "Evaluation Frameworks"],
    keyAchievement:
      "Improved code generation accuracy metrics by 35% through structured review",
    location: { city: "Toronto", country: "Canada", lat: 43.65, lng: -79.38 },
  },
  {
    company: "Opas Mobile",
    role: "DevOps Developer (Co-op)",
    period: "2023 - 2024",
    oneLiner:
      "Cut release cycles by 60% with CI/CD pipelines and Terraform-provisioned AWS infrastructure.",
    techStack: ["Terraform", "AWS", "GitHub Actions", "Docker"],
    keyAchievement:
      "Cut release cycles from 2 weeks to 3 days with automated CI/CD",
    location: { city: "Halifax", country: "Canada", lat: 44.64, lng: -63.57 },
  },
  {
    company: "Crest Data Systems",
    role: "Software Engineer",
    period: "2018 - 2022",
    oneLiner:
      "Built high-throughput REST APIs (~1,300 rps) and migrated monolithic workloads to serverless.",
    techStack: ["Java", "Spring Boot", "AWS Lambda", "PostgreSQL"],
    keyAchievement:
      "Migrated monolith to serverless, reducing infra costs by 40%",
    location: { city: "Ahmedabad", country: "India", lat: 23.02, lng: 72.57 },
  },
] as const;

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export interface Education {
  readonly institution: string;
  readonly degree: string;
  readonly period: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly lat: number;
    readonly lng: number;
  };
}

export const education: readonly Education[] = [
  {
    institution: "Dalhousie University",
    degree: "Master of Applied Computer Science",
    period: "2022 - 2023",
    location: { city: "Halifax", country: "Canada", lat: 44.64, lng: -63.57 },
  },
  {
    institution: "Charotar University",
    degree: "Bachelor of Technology in IT",
    period: "2015 - 2019",
    location: { city: "Changa", country: "India", lat: 22.60, lng: 72.82 },
  },
  {
    institution: "Surat",
    degree: "Where it all began",
    period: "1997 - 2015",
    location: { city: "Surat", country: "India", lat: 21.17, lng: 72.83 },
  },
] as const;

// ---------------------------------------------------------------------------
// Case Study — NomadCrew
// ---------------------------------------------------------------------------

export interface CaseStudy {
  readonly name: string;
  readonly problem: string;
  readonly approach: string;
  readonly techDecisions: readonly string[];
  readonly repoUrl: string;
  readonly appStoreUrl: string | null;
  readonly playStoreUrl: string | null;
  readonly screenshots: readonly string[];
}

export const caseStudy: CaseStudy = {
  name: "NomadCrew",
  problem:
    "Coordinating group trips across time zones, budgets, and preferences is fragmented — scattered chats, spreadsheets, and lost context make collaboration painful.",
  approach:
    "A collaborative trip-coordination platform built with Go and React Native, featuring real-time chat, matrix-based authorization, and a relational data model designed for multi-party planning.",
  techDecisions: [
    "Go for the backend — strong concurrency primitives and low operational overhead at scale.",
    "React Native for cross-platform mobile — single codebase reaching both iOS and Android.",
    "PostgreSQL for relational data — enforces referential integrity across trips, members, and permissions.",
    "WebSockets for real-time updates — instant chat and live trip-state synchronization.",
  ],
  repoUrl: "https://github.com/naqeebali-shamsi/nomadcrew",
  appStoreUrl: null,
  playStoreUrl: null,
  screenshots: [],
} as const;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export interface Project {
  name: string
  description: string
  techStack: string[]
  links: Array<{ name: string; url: string }>
  status?: 'active' | 'shipped' | 'in-progress'
  tier: 1 | 2
}

export const projects: Project[] = [
  // TIER 1 — Lead projects
  {
    name: 'NomadCrew',
    description: 'Mobile-first group travel coordination with real-time chat, expense splitting, and location sharing.',
    techStack: ['Go', 'React Native', 'Expo', 'PostgreSQL', 'Redis', 'WebSockets', 'AWS'],
    links: [{ name: 'GitHub', url: 'https://github.com/NomadCrew' }],
    status: 'active',
    tier: 1,
  },
  {
    name: 'Audex',
    description: 'Desktop app for financial audit automation — Excel workbook generation and PDF reporting.',
    techStack: ['Electron', 'TypeScript', 'VBA', 'Excel Automation', 'PDF'],
    links: [],
    status: 'active',
    tier: 1,
  },
  {
    name: 'IntelliFill',
    description: 'AI-powered document processing and form automation with multi-agent workflows.',
    techStack: ['Node.js', 'React', 'Prisma', 'PostgreSQL', 'LangGraph', 'Docker', 'AWS'],
    links: [],
    status: 'active',
    tier: 1,
  },
  // TIER 2 — Strong secondary
  {
    name: 'Politia',
    description: 'Transparent accountability dashboard for Indian politicians with evidence-backed scorecards.',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'Docker'],
    links: [],
    status: 'active',
    tier: 2,
  },
  {
    name: 'Aladeen',
    description: 'Cross-platform TUI for orchestrating multiple AI coding CLIs with unified auth and routing.',
    techStack: ['TypeScript', 'React Ink', 'Node.js', 'Commander.js'],
    links: [],
    status: 'active',
    tier: 2,
  },
  {
    name: 'RideSkipper',
    description: 'Trip booking platform with real-time reservations, full testing suite, and Prisma ORM.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'React Hook Form', 'Playwright'],
    links: [],
    status: 'shipped',
    tier: 2,
  },
]

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export interface ContactInfo {
  readonly email: string;
  readonly socials: {
    readonly github: string;
    readonly linkedin: string;
    readonly twitter: string;
  };
}

export const contactInfo: ContactInfo = {
  email: "naqeebali.shamsi@gmail.com",
  socials: {
    github: "https://github.com/naqeebali-shamsi",
    linkedin: "https://www.linkedin.com/in/naqeebali-shamsi/",
    twitter: "https://x.com/NaqeebaliS",
  },
} as const;
