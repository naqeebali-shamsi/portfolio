# Phase 2 Plan 3: Experience Timeline + Contact Footer Summary

**One-liner:** Vertical timeline with 4 work entries, education grid, full-viewport contact with click-to-copy email and social icon row

---

## Metadata

- **Phase:** 02-content-sections
- **Plan:** 03
- **Subsystem:** content-sections
- **Tags:** experience, timeline, contact, clipboard, social-links

## Dependency Graph

- **Requires:** 02-01 (content data), 02-02 (case study)
- **Provides:** Complete Phase 2 content layer, all sections wired into App
- **Affects:** Phase 3 (hero), Phase 4 (animations) — all scroll targets now exist

## What Was Built

### useCopyToClipboard Hook
- Returns `{ copied, copy }` with auto-reset after configurable delay
- Uses `navigator.clipboard.writeText()` with error handling
- Clears previous timeout on rapid re-clicks

### SocialLinks Component
- Renders GitHub, LinkedIn, X icons as a horizontal row
- SVG icons copied from legacy file, restyled for light theme
- `text-text-muted` default, `hover:text-accent` transition
- Size-5 (20px) icons for good tap targets

### Experience Section
- Vertical timeline: `w-px bg-accent/30` line with `bg-accent` dots at each entry
- 4 work entries: period, company, role, one-liner
- Education sub-section below timeline with `border-t border-accent/10` divider
- 2-column grid on md+ for education entries

### Contact Section
- Full viewport height (`min-h-screen` + flex centering)
- "GET IN TOUCH" label above email
- Email as hero button — click copies to clipboard
- Shows "Copied!" in accent color with helper text transition
- SocialLinks rendered below with `mt-12`

### App.tsx Wiring
- All 4 Phase 2 sections render in order: HowIBuild, CaseStudy, Experience, Contact
- No placeholder sections remain except hero (Phase 3)

## Tech Stack

- **Added:** None (no new dependencies)
- **Patterns:** Custom hook for clipboard interaction, SVG icon components without library

## Key Files

### Created
- `src/hooks/useCopyToClipboard.ts`
- `src/components/SocialLinks.tsx`
- `src/sections/Experience.tsx`

### Modified
- `src/sections/Contact.tsx` (full overwrite of legacy)
- `src/App.tsx` (added Experience + Contact imports)

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Copy SVG icons instead of importing legacy social-icons.tsx | Legacy file imports from dark-themed portfolio.js with incompatible styling |
| No animation on timeline yet | Phase 4 will add GSAP scroll animations |
| useRef for timeout cleanup | Prevents stale timeout on rapid re-clicks |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- `tsc --noEmit`: No errors in new/modified files (pre-existing legacy errors unchanged)
- `vite build`: Succeeds in 1.73s
- Experience: 4 timeline entries with vertical line + dots, education grid below
- Contact: Full viewport, click-to-copy email, social icons with light theme styling
- App.tsx: All Phase 2 sections wired in correct order

## Commits

| Hash | Message |
|------|---------|
| 20b13c6 | feat(02-03): create useCopyToClipboard hook and SocialLinks component |
| bf43514 | feat(02-03): build Experience/Contact sections, wire all Phase 2 into App |

## Duration

~3 minutes

## Phase 2 Completion

All 3 plans in Phase 2 are now complete:
- 02-01: Content data + HowIBuild manifesto
- 02-02: NomadCrew case study section
- 02-03: Experience timeline + Contact footer + App wiring

The content layer is complete. Scrolling tells the full story: philosophy -> work -> experience -> contact.
