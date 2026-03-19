# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-18)

**Core value:** A visitor feels the craft within 2 seconds, reads sharp copy, sees engineering depth, and leaves thinking "this person builds things properly."
**Current focus:** Phase 4 complete — Scroll Animations. Ready for Phase 5 (Custom Cursor).

## Current Position

Phase: 4 of 6 (Scroll Animations) -- COMPLETE
Plan: 2 of 2 in current phase
Status: Phase complete
Last activity: 2026-03-19 — Completed 04-02-PLAN.md

Progress: [█████████░] 75%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: 4.6min
- Total execution time: 0.69 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-design-system | 2/2 | 7min | 3.5min |
| 02-content-sections | 3/3 | 10min | 3.3min |
| 03-hero-section | 2/2 | 6min | 3min |
| 04-scroll-animations | 2/2 | 18min | 9min |

**Recent Trend:**
- Last 5 plans: 3min, 3min, 3min, 13min, 5min
- Trend: stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- GSAP only, no Framer Motion (saves ~30KB, superior for scroll-linked animations)
- Light theme with extreme whitespace (blunar-inspired)
- 3D in hero only, lazy-loaded with CSS fallback
- Tailwind 4 @theme in CSS replaces tailwind.config.js (no JS config)
- Fontsource self-hosting replaces Google Fonts CDN
- Single light theme replaces multi-theme ThemeContext system
- NS initials in nav bar (full name appears in hero section)
- Nav z-index z-50 to stay above future 3D canvas elements
- 10px scroll threshold for useScrollDirection to prevent jitter
- Centralized typed content file (src/data/content.ts) as single source of truth for all section data
- HowIBuild manifesto style: no heading, statements only, reflective tone
- Structural full-width breakout pattern (not CSS 100vw trick) for case study sections
- ArchBox/Arrow as private helper components within CaseStudy (not exported)
- Copy SVG icons into SocialLinks rather than importing legacy social-icons.tsx (incompatible dark theme styling)
- Hero name split across two lines for visual impact at display scale
- CSS fallback hidden on mobile (text-only hero on small screens)
- MeshTransmissionMaterial needs Environment preset + background color to look like glass (not opaque black)
- backside=true with backsideThickness for realistic glass refraction
- Canvas unmount (not frameloop="never") for full WebGL context disposal
- R3F v9 required for React 19 compatibility
- power3.out easing for all scroll reveals (GSAP equivalent of cubic-bezier(0.16, 1, 0.3, 1))
- data-reveal attributes instead of CSS classes for animation targeting
- gsap.matchMedia wrapping entire animation block for clean reduced-motion support
- CSS for simple hovers, GSAP contextSafe for complex multi-property animations
- Pin on section element (not nested child) for pin-and-scrub to avoid layout breaks
- pointerenter + hover media query guard for touch device compatibility
- fromTo() for scrubbed animations to avoid immediateRender conflict

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-03-19
Stopped at: Completed 04-02-PLAN.md (parallax, pin-and-scrub, hover micro-interactions)
Resume file: None
