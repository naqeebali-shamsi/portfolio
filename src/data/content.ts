// Centralized content data for all portfolio sections
// Single source of truth — all section components import from here

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const heroTitles = ["Cloud Developer", "Solution Architect", "Full Stack Developer"] as const;
export const heroTagline = "Engineering systems that scale — from infrastructure to interface.";

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
  },
  {
    company: "Opas Mobile",
    role: "DevOps Developer",
    period: "2023 - 2024",
    oneLiner:
      "Cut release cycles by 60% with CI/CD pipelines and Terraform-provisioned AWS infrastructure.",
    techStack: ["Terraform", "AWS", "GitHub Actions", "Docker"],
    keyAchievement:
      "Cut release cycles from 2 weeks to 3 days with automated CI/CD",
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
  },
] as const;

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export interface Education {
  readonly institution: string;
  readonly degree: string;
  readonly period: string;
}

export const education: readonly Education[] = [
  {
    institution: "Dalhousie University",
    degree: "Master of Applied Computer Science",
    period: "2022 - 2023",
  },
  {
    institution: "Charotar University",
    degree: "Bachelor of Technology in IT",
    period: "2015 - 2019",
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
    twitter: "https://x.com/",
  },
} as const;
