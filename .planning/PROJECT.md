# Premium Portfolio Website

## What This Is

A premium minimalist portfolio website for Naqeebali Shamsi — Full Stack Engineer based in Toronto. Inspired by blunar.cz's layout discipline (surgical typography, extreme whitespace, smooth animations) with a single 3D hero moment inspired by henryheffernan.com. Light theme, not dark. The copywriting is the centerpiece. The portfolio itself is the proof of capability.

## Core Value

A visitor lands, feels the craft immediately, reads sharp copy, sees 2 deep project case studies that demonstrate real engineering depth, and leaves thinking "this person builds things properly." The site must feel premium within 2 seconds of loading.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with lazy-loaded 3D element (R3F), name, rotating role typewriter, tagline, CSS fallback for low-end devices
- [ ] "How I Build" section — engineering philosophy, big typography, how I think about systems (replaces generic About)
- [ ] NomadCrew deep case study — problem, approach, technical decisions, architecture, outcome. Full-width scroll-driven reveal with embedded app screenshots
- [ ] Propwise deep case study — backend/infrastructure narrative, system architecture diagram, technical depth showcase
- [ ] Experience timeline — minimal, companies + years + roles only, no resume dump
- [ ] Contact section — email reveal interaction, social links (LinkedIn, GitHub, Twitter/X)
- [ ] Responsive design — explicit mobile strategy with 3D disabled on low-end devices, touch-optimized interactions
- [ ] Performance budget — under 200KB gzipped first meaningful paint (excluding lazy-loaded 3D), 60fps animations, Lighthouse 90+
- [ ] SEO — proper meta tags, Open Graph, JSON-LD person schema, pre-rendered or SSR critical content
- [ ] Typography system — Space Grotesk (headings) + Inter (body), font-display: swap, antialiased rendering
- [ ] Scroll-driven animations — GSAP ScrollTrigger for all scroll-linked motion, section reveals, parallax
- [ ] Custom cursor — reactive cursor that morphs on interactive elements (desktop only)
- [ ] Navigation — minimal, either floating or hidden overlay, not a standard top bar
- [ ] Deployment — Vercel with CDN, custom domain (naqeebali.me)

### Out of Scope

- Blog/writing section on the portfolio itself — link externally to Medium if needed
- Testimonials section — no strong social proof available, don't fake it
- Skills/Stack as standalone section — technologies folded into case studies where they have context
- Dark mode toggle — one theme, done well, no switching complexity
- CMS or admin panel — content is static, managed in code
- Multiple pages/routing — single page, scroll-driven experience
- Sound design / audio — adds complexity without clear value for this audience
- Framer Motion — GSAP handles all animation needs, no dual animation systems

## Context

- Existing codebase in N:\Portfolio\Latest\ has React 19 + Vite 7 + Tailwind 4 + Framer Motion (will be replaced)
- Current site at naqeebali.me is obsolete (developerFolio template, emoji-heavy, resume dump)
- User's copywriting from existing site: "Real Problems, Creative Solutions: I'm Here to Make Tech Work Harder So We Don't Have To" — rotating typewriter titles: Cloud Developer, Solution Architect, Full Stack Developer
- NomadCrew: Go backend (Gin), React Native (Expo), PostgreSQL, Supabase Auth, AWS. Live on App Store, closed testing on Play Store. Landing page: nomadcrew.uk
- Propwise: Python (FastAPI) backend, async job pipelines (SQS + Lambda), RBAC, LLM-assisted features with prompt versioning
- Other projects exist (RideSkipper, camera-repairs, Reknown) but design quality is acknowledged as "AI slop" — not portfolio-worthy unless elevated
- Resume: Crest Data Systems (3.5 yrs), Opas Mobile (co-op), Propwise, Outlier AI, Dalhousie Masters
- Research completed: 13 benchmark portfolios studied, tech stack validated, AI-assisted dev workflow documented in RESEARCH.md

## Constraints

- **Tech stack**: React 19 + Vite 7 + R3F 9 (hero only, lazy-loaded) + GSAP 3.12 + Tailwind CSS 4. No Framer Motion.
- **Performance**: First meaningful paint under 200KB gzipped. 3D bundle lazy-loaded separately. WebGL disposed after scroll-past.
- **Mobile**: 3D hero disabled on low-end devices (check hardwareConcurrency/deviceMemory). CSS fallback must look intentional, not broken.
- **Browser support**: Modern browsers only (Chrome, Firefox, Safari, Edge — last 2 versions)
- **Timeline**: Ship within current work sprint, iterate after deployment
- **Content**: Only 2 deep case studies (NomadCrew, Propwise). Quality over quantity.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GSAP only, no Framer Motion | Avoids dual animation systems, saves ~30KB, GSAP is superior for scroll-linked animations which are the primary pattern | -- Pending |
| Light theme, not dark | Blunar-style breathing whitespace. Most "premium" portfolios go dark — light is more distinctive and lets typography shine | -- Pending |
| 3D in hero only | One knockout moment > scattered 3D. Reduces bundle size, focuses engineering effort, prevents "tech demo" feel | -- Pending |
| Deep case studies over project cards | 2 projects shown deeply > 5 shown shallowly. Demonstrates architectural thinking, not just output | -- Pending |
| Kill standalone Skills section | Technologies without context are meaningless. "Used Go because..." inside a case study > bar chart showing Go at 80% | -- Pending |
| Space Grotesk + Inter typography | Blunar uses this exact pairing. Geometric display + legible body. Proven premium feel | -- Pending |
| Lazy-load R3F with CSS fallback | Hero text renders instantly via CSS. 3D fades in after load. Low-end devices get CSS-only version that still looks intentional | -- Pending |

---
*Last updated: 2026-03-18 after initialization*
