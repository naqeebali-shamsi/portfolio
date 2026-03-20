# Roadmap: Premium Portfolio Website

## Overview

Build a premium minimalist portfolio from the design system out. Typography, colors, and whitespace establish the visual language first. Content sections build on that foundation using static layouts. The 3D hero — the most complex piece — develops independently once the design system exists. GSAP animations layer on top of completed content. Final phase handles mobile, performance, SEO, and deployment to ship the site live.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Design System** - Typography, colors, whitespace, and navigation foundation
- [x] **Phase 2: Content Sections** - How I Build, NomadCrew case study, experience timeline, contact
- [x] **Phase 3: Hero Section** - Name, typewriter, tagline with CSS layout and 3D geometric element
- [x] **Phase 4: Scroll Animations** - GSAP ScrollTrigger for all section reveals, parallax, and micro-interactions
- [ ] **Phase 5: Custom Cursor** - Desktop cursor that morphs on interactive elements
- [ ] **Phase 6: Ship** - Mobile responsive, performance budget, SEO, Vercel deployment

## Phase Details

### Phase 1: Design System
**Goal**: The visual language exists — every component built after this inherits consistent typography, color, and spacing
**Depends on**: Nothing (first phase)
**Requirements**: DESG-01, DESG-02, DESG-03, DESG-04
**Success Criteria** (what must be TRUE):
  1. Space Grotesk renders for all headings and Inter renders for all body text, with font-display: swap preventing FOIT
  2. A consistent light color palette (near-white background, dark text, accent colors) is applied site-wide via Tailwind config
  3. Sections have generous whitespace — padding and margins create visible breathing room between all content blocks
  4. Navigation element exists (floating or hidden overlay) and links to section anchors
**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md — Strip legacy dark theme, install Fontsource fonts, create @theme design tokens and base styles
- [x] 01-02-PLAN.md — Scroll-aware navigation component with mobile overlay and section anchors

### Phase 2: Content Sections
**Goal**: All non-hero content is on the page with real copy, readable and properly structured — the site tells a story when scrolled
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. "How I Build" section displays engineering philosophy with large display typography that communicates a point of view
  2. NomadCrew case study shows problem, approach, technical decisions, architecture overview, embedded screenshots, and app store links in a full-width scroll layout
  3. Experience timeline displays companies (Crest Data Systems, Opas Mobile, Propwise, Outlier AI, Dalhousie) with years and role titles — no resume dump
  4. Contact section reveals email through an interaction (not plain text) and shows LinkedIn, GitHub, and Twitter/X links
**Plans:** 3 plans

Plans:
- [x] 02-01-PLAN.md — Typed content data layer and "How I Build" manifesto section
- [x] 02-02-PLAN.md — NomadCrew case study with full-width breakout and CSS device frames
- [x] 02-03-PLAN.md — Experience timeline, contact footer with click-to-copy, and final App.tsx wiring

### Phase 3: Hero Section
**Goal**: A visitor lands and the hero immediately communicates "premium" — name, rotating titles, tagline, and a 3D element that responds to the cursor
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05
**Success Criteria** (what must be TRUE):
  1. Hero displays "Naqeebali Shamsi" with rotating typewriter cycling through Cloud Developer, Solution Architect, Full Stack Developer, plus tagline copy
  2. A 3D geometric element (R3F) loads behind React.lazy + Suspense and responds to cursor movement
  3. Before 3D loads (and on devices with low hardwareConcurrency/deviceMemory), a CSS-only fallback renders that looks intentional — gradient, blur, or static shape
  4. WebGL context is disposed when user scrolls past the hero section (verified via devtools — no lingering GPU usage)
**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md — Hero layout, GSAP typewriter, CSS fallback, and device capability detection
- [x] 03-02-PLAN.md — R3F glass icosahedron with lazy loading, cursor follow, and WebGL disposal

### Phase 4: Scroll Animations
**Goal**: Every section has scroll-driven motion — the site feels alive and intentional as the user scrolls, not static
**Depends on**: Phase 2, Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. GSAP ScrollTrigger drives section reveals — content fades/slides in as sections enter the viewport
  2. Text stagger animations and parallax effects are present on at least the hero and case study sections
  3. Interactive elements (links, project cards, nav items) have hover micro-interactions (scale, color shift, or underline animation)
**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md — GSAP infrastructure setup, ScrollTrigger registration, and section reveal animations for all content sections
- [x] 04-02-PLAN.md — Hero parallax, case study pin-and-scrub, nav underline, timeline expand-on-hover, social link scale

### Phase 5: Custom Cursor
**Goal**: Desktop visitors see a custom cursor that morphs contextually — another detail that signals craft
**Depends on**: Phase 4
**Requirements**: HERO-06
**Success Criteria** (what must be TRUE):
  1. Default system cursor is replaced by a custom cursor on desktop viewports
  2. Cursor morphs when hovering interactive elements — grows on links, shows text mask on project cards
  3. Custom cursor is not rendered on touch/mobile devices
**Plans**: TBD

Plans:
- [ ] 05-01: Custom cursor component with contextual morphing

### Phase 6: Ship
**Goal**: The site is live at naqeebali.me, fast on mobile, findable by search engines, and passes performance budget
**Depends on**: Phase 4, Phase 5
**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04
**Success Criteria** (what must be TRUE):
  1. First meaningful paint is under 200KB gzipped (excluding lazy-loaded 3D bundle), verified via Lighthouse or WebPageTest
  2. All sections render correctly on mobile with touch-friendly tap targets — 3D hero is replaced by CSS fallback on low-end devices
  3. Meta tags, Open Graph tags, and JSON-LD person schema are present and validate with structured data testing tools
  4. Site is deployed on Vercel, accessible at naqeebali.me, and serves via CDN
  5. Lighthouse score is 90+ on Performance, Accessibility, Best Practices, and SEO
**Plans**: TBD

Plans:
- [ ] 06-01: Mobile responsive pass and performance optimization
- [ ] 06-02: SEO markup and Vercel deployment

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6
Note: Phases 2 and 3 can execute in parallel (both depend only on Phase 1).

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Design System | 2/2 | ✓ Complete | 2026-03-18 |
| 2. Content Sections | 3/3 | ✓ Complete | 2026-03-18 |
| 3. Hero Section | 2/2 | ✓ Complete | 2026-03-18 |
| 4. Scroll Animations | 2/2 | ✓ Complete | 2026-03-20 |
| 5. Custom Cursor | 0/1 | Not started | - |
| 6. Ship | 0/2 | Not started | - |
