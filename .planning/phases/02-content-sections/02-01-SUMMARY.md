# Phase 2 Plan 1: Content Data Layer + How I Build Section Summary

**One-liner:** Typed content data hub with 5 exported data groups and manifesto-style HowIBuild section using display typography

---

## Metadata

- **Phase:** 02-content-sections
- **Plan:** 01
- **Subsystem:** content-data, sections
- **Tags:** typescript, data-layer, content, manifesto, typography
- **Duration:** ~4 minutes
- **Completed:** 2026-03-18

### Dependencies

- **Requires:** Phase 1 (design system tokens, Navbar, App shell)
- **Provides:** Typed content data for all Phase 2 sections; HowIBuild section component
- **Affects:** 02-02 (case study), 02-03 (experience + contact) — both import from content.ts

### Tech Stack

- **Added:** None (pure TypeScript + React)
- **Patterns:** Centralized typed content file with readonly interfaces and `as const`

### Key Files

- **Created:** `src/data/content.ts`, `src/sections/HowIBuild.tsx`
- **Modified:** `src/App.tsx`

---

## What Was Done

### Task 1: Create typed content data file
- Created `src/data/content.ts` as the single source of truth for all section content
- Exported 5 data groups with TypeScript interfaces:
  - `howIBuildStatements` — 3 reflective engineering philosophy statements
  - `Experience` interface + `experiences` array (4 roles: Propwise, Outlier AI, Opas Mobile, Crest Data Systems)
  - `Education` interface + `education` array (Dalhousie University, Charotar University)
  - `CaseStudy` interface + `caseStudy` object (NomadCrew with problem/approach/techDecisions)
  - `ContactInfo` interface + `contactInfo` object (email + github/linkedin/twitter)
- All data uses `as const` and `readonly` for immutability
- **Commit:** `a63ceea`

### Task 2: Build HowIBuild section and wire into App
- Created `src/sections/HowIBuild.tsx` as named export component
- Renders 3 manifesto statements with responsive display typography (text-3xl / text-4xl / text-5xl)
- No section heading — statements ARE the content (manifesto style per context)
- Generous spacing between statements (space-y-16 / space-y-24)
- Section uses `bg-bg-feature`, `scroll-mt-20`, `max-w-4xl` line width cap
- Updated `src/App.tsx` to import HowIBuild and replace the placeholder section
- **Commit:** `3a02a35`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Statements are reflective, not aggressive | Per context: "thoughtful and measured, not aggressive startup bro speak" |
| No section heading in HowIBuild | Per context: "manifesto style, not a titled section" — statements speak for themselves |
| `as const` + `readonly` on all data | Prevents accidental mutation; enables narrower type inference |
| Separate interfaces for each data group | Clean imports for section components; each section only pulls what it needs |

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `tsc --noEmit` — no type errors in any new/modified files
- `vite build` — successful production build (984ms)
- Content.ts exports all 5 data groups with proper TypeScript interfaces
- HowIBuild renders manifesto statements without a section heading
- App.tsx imports and renders HowIBuild at correct position
- Section uses `bg-bg-feature` background and `scroll-mt-20` for nav offset

## Next Phase Readiness

Plans 02-02 (case study) and 02-03 (experience + contact) can now import typed data from `src/data/content.ts`. No blockers.
