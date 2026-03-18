# Phase 2 Plan 2: NomadCrew Case Study Section Summary

**One-liner:** Full-width breakout case study with CSS architecture diagram, DeviceFrame phone mockups, and tech decision narrative

---

## Metadata

- **Phase:** 02-content-sections
- **Plan:** 02
- **Subsystem:** sections, components
- **Tags:** case-study, css-architecture-diagram, device-frame, layout-breakout
- **Duration:** ~3 minutes
- **Completed:** 2026-03-18

### Dependencies

- **Requires:** 02-01 (content data layer with caseStudy export)
- **Provides:** CaseStudy section component, DeviceFrame reusable component
- **Affects:** Phase 4 (animations), future case studies can reuse DeviceFrame

### Tech Stack

- **Added:** None (uses existing clsx, lucide-react)
- **Patterns:** Structural full-width breakout (w-full bg-bg-feature inside non-contained parent), helper sub-components for architecture diagram

### Key Files

- **Created:** `src/components/DeviceFrame.tsx`, `src/sections/CaseStudy.tsx`
- **Modified:** `src/App.tsx`

---

## What Was Done

### Task 1: Create DeviceFrame component
- Pure CSS phone mockup with bezel (rounded-[2.5rem], border-[8px] border-bg-dark), notch, and screen area
- Accepts children for screen content and optional className for sizing
- Uses clsx for class merging
- Purely presentational -- no state, no effects
- **Commit:** `3b0c97b`

### Task 2: Build CaseStudy section and wire into App
- Created `src/sections/CaseStudy.tsx` with three-part layout:
  1. **Contained intro:** "CASE STUDY" label, "NomadCrew" heading, problem statement
  2. **Full-width breakout:** bg-bg-feature band with two-column grid
     - Left: CSS architecture flow diagram (React Native -> Go API -> PostgreSQL + WebSockets -> AWS) with ArchBox/Arrow helper components, plus tech decision bullet list
     - Right: Two DeviceFrame phone mockups with placeholder content, GitHub link
  3. **Contained outro:** "APPROACH" label with approach paragraph
- Imports caseStudy from @/data/content and DeviceFrame from @/components/DeviceFrame
- Uses structural breakout (w-full div) not the CSS 100vw viewport trick
- Replaced work placeholder in App.tsx with CaseStudy component
- **Commit:** `d05d0e4`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| ArchBox/Arrow as private helper components | Keeps CaseStudy readable without polluting component exports |
| Structural breakout instead of 100vw trick | Avoids horizontal scrollbar issues; cleaner semantic structure |
| Vertical flow diagram with branching | Shows PostgreSQL and WebSockets as parallel concerns off Go API |
| accent/40 colors for diagram lines | Subtle visual connection without competing with content |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- `tsc --noEmit` -- no type errors in DeviceFrame, CaseStudy, or App.tsx (pre-existing errors in legacy files only)
- `vite build` -- successful production build (1.88s)
- DeviceFrame renders phone bezel with notch and accepts children
- CaseStudy uses structural breakout (no 100vw trick)
- Architecture diagram is pure CSS/HTML (no image assets)
- CaseStudy imports from @/data/content (not legacy portfolio.js)
- App.tsx renders CaseStudy at the work position
- Section has scroll-mt-20 for navbar offset

## Next Phase Readiness

Plan 02-03 (experience + contact sections) can proceed. No blockers.
