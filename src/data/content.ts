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
  "Good architecture is a series of quiet bets on the future. Each one earns trust the moment requirements shift.",
  "Ship small, verify early, compound gains. The best systems aren't designed in a single pass; they're grown through disciplined iteration.",
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
    "Coordinating group trips across time zones, budgets, and preferences is fragmented. Scattered chats, spreadsheets, and lost context make collaboration painful.",
  approach:
    "A collaborative trip-coordination platform built with Go and React Native, featuring real-time chat, matrix-based authorization, and a relational data model designed for multi-party planning.",
  techDecisions: [
    "Go for the backend: strong concurrency primitives and low operational overhead at scale.",
    "React Native for cross-platform mobile: single codebase reaching both iOS and Android.",
    "PostgreSQL for relational data: enforces referential integrity across trips, members, and permissions.",
    "WebSockets for real-time updates: instant chat and live trip-state synchronization.",
  ],
  repoUrl: "https://github.com/naqeebali-shamsi/nomadcrew",
  appStoreUrl: "https://apps.apple.com/au/app/nomad-crew/id6743161123",
  playStoreUrl: null,
  screenshots: [],
} as const;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export interface Project {
  name: string
  description: string
  /** Fuller description shown on the back of flippable Tier 2 cards; falls back to `description`. */
  details?: string
  /** Externally-hosted demo video (not bundled in the build); opens in a lightbox via a "Watch demo" button. */
  video?: string
  videoPoster?: string
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
    links: [
      { name: 'Live', url: 'https://nomadcrew.uk' },
      { name: 'GitHub', url: 'https://github.com/NomadCrew' },
      { name: 'App Store', url: 'https://apps.apple.com/au/app/nomad-crew/id6743161123' },
    ],
    status: 'active',
    tier: 1,
  },
  {
    name: 'Audex',
    description: 'Desktop app for financial audit automation that generates Excel workbooks and PDF reports.',
    techStack: ['Electron', 'TypeScript', 'VBA', 'Excel Automation', 'PDF'],
    links: [{ name: 'Microsoft Store', url: 'https://apps.microsoft.com/detail/9P87TFB7D3TD?hl=en-us&gl=AE&ocid=pdpshare' }],
    status: 'active',
    tier: 1,
  },
  {
    name: 'Mecanum',
    description: 'Lead-gen site for a Dubai-based American car-parts supplier. Bilingual EN/AR with full RTL, Payload CMS for editorial, scroll-pinned GSAP imagery, WhatsApp-first conversion.',
    techStack: ['Next.js 16', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Prisma', 'Tailwind', 'GSAP', 'Vercel'],
    links: [{ name: 'Live', url: 'https://mecanum.ae' }],
    status: 'active',
    tier: 1,
  },
  {
    name: 'Aladeen',
    description: 'Observability and learning layer for agent CLIs (Claude Code, opencode, Codex). Ingests session logs, classifies failures, mines cross-run patterns, and replays known-good blueprints. Published on npm.',
    techStack: ['TypeScript', 'Node.js', 'Ink', 'MCP', 'Zod', 'Commander'],
    links: [
      { name: 'npm', url: 'https://www.npmjs.com/package/aladeen' },
      { name: 'GitHub', url: 'https://github.com/naqeebali-shamsi/Aladeen' },
    ],
    status: 'active',
    tier: 1,
  },
  // TIER 2 — Strong secondary
  {
    name: 'Politia',
    description: 'Transparent accountability dashboard for Indian politicians with evidence-backed scorecards.',
    details:
      'Aggregates official public data on every Indian Member of Parliament into one searchable, source-backed dashboard where each metric traces to an official record (500k+ election records ingested). Politically neutral by design: it presents the data and lets citizens, journalists, and researchers draw their own conclusions.',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'Docker'],
    links: [],
    status: 'active',
    tier: 2,
  },
  {
    name: 'RideSkipper',
    description: 'Trip booking platform with real-time reservations, full testing suite, and Prisma ORM.',
    details:
      'A trip-booking platform with real-time seat reservations on a fully-typed Next.js + Prisma/PostgreSQL stack. Booking and checkout forms are built with React Hook Form, and the critical flows are covered end-to-end by a Playwright test suite.',
    video: 'https://github.com/naqeebali-shamsi/portfolio/releases/download/rideskipper-demo/rideskipper-demo.mp4',
    videoPoster: 'https://github.com/naqeebali-shamsi/portfolio/releases/download/rideskipper-demo/rideskipper-poster.jpg',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'React Hook Form', 'Playwright'],
    links: [],
    status: 'shipped',
    tier: 2,
  },
  {
    name: 'IntelliFill',
    description: 'AI-powered document processing and form automation with multi-agent workflows.',
    details:
      'An intelligent document-processing platform that extracts data from source files and auto-fills target forms using multi-agent LLM workflows. Built on Node.js and React with a Prisma/PostgreSQL backend, orchestrated with LangGraph, and deployed on AWS via Docker.',
    techStack: ['Node.js', 'React', 'Prisma', 'PostgreSQL', 'LangGraph', 'Docker', 'AWS'],
    links: [],
    status: 'active',
    tier: 2,
  },
  {
    name: 'AI RunSpec',
    description: 'Spotify-style catalog of AI models and frameworks that checks which ones your hardware specs can run.',
    details:
      'A Spotify-style library for browsing AI models and frameworks: LLMs, vision, video, audio, and agent frameworks like LangChain and CrewAI. Enter your hardware specs and it flags which models you can realistically run locally, with featured, trending, and new-release shelves.',
    techStack: ['React', 'TypeScript', 'Gemini', 'Vite', 'Cloud Run'],
    links: [{ name: 'Live', url: 'https://can-i-run-ai-369652278516.us-west1.run.app' }],
    status: 'active',
    tier: 2,
  },
  {
    name: 'Valytech',
    description: 'AI-automation consultancy that maps process waste with LEAN and Six Sigma, then ships it as agent workflows.',
    details:
      'An AI-automation consultancy I built end to end, from the name and brand to the copy and a hand-coded site with no framework. The pitch is calm by design. Find where the work leaks time with LEAN and Six Sigma, then turn proven SOPs into agent workflows. The build is the proof: vanilla JS over a hand-authored design-token CSS system, shipped on Cloudflare.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Design Tokens', 'Cloudflare'],
    links: [{ name: 'Live', url: 'https://valytech.com' }],
    status: 'active',
    tier: 2,
  },
  {
    name: 'SpeakingBrand',
    description: 'A positioning diagnostic that helps founder-led brands sharpen what they stand for before spending on growth.',
    details:
      'A positioning diagnostic for founder-led brands, currently in private beta by application. Most early brands pour money into growth before they can say clearly what sets them apart; the tool fixes that first. Designed, written, coded, and shipped solo: a hand-built static site with Rough.js sketched visuals and a custom waitlist, on Cloudflare.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Rough.js', 'Cloudflare'],
    links: [{ name: 'Live', url: 'https://speakingbrand.com' }],
    status: 'active',
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
