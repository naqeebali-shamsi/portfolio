# Phase 1: Design System - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the visual language — typography, colors, whitespace tokens, and navigation — that every component built after this inherits. No content sections, no animations, no 3D. Just the design foundation.

</domain>

<decisions>
## Implementation Decisions

### Color palette
- Background: #FAFAF5 (warm off-white) — site-wide default
- Primary text: #32292F (Shadow Grey) — near-black with plum undertone
- Secondary text: #705D56 (Taupe Grey) — warm brown-grey for muted content
- Primary accent: #70ABAF (Tropical Teal) — links, interactive elements, highlights
- Light accent: #99E1D9 (Pearl Aqua) — subtle highlights, hover states, decorative use
- Feature section bg: #F0F7F4 (Mint Cream) — alternate background for hero/case study sections
- Most sections use #FAFAF5; feature sections (hero, case study) get contrasting treatment using #F0F7F4 or #32292F (dark band)

### Typography
- Headings: Space Grotesk, Bold 700, uppercase with 0.05-0.1em letter-spacing
- Body: Inter, Regular 400, 1.125rem (18px), line-height 1.75
- Display scale: Hero name 6-8rem, section headings 4-5rem, subheadings 2-3rem
- Massive, bold type — typography IS the design. Headings dominate the viewport
- font-display: swap on both fonts to prevent FOIT

### Spacing & layout
- Section gap: 80-100px vertical padding between major sections (moderate, content-dense)
- Max content width: 1400px+ (near full-width on standard screens)
- No formal grid system — use 8px-base spacing tokens for consistent spacing
- Freeform positioning; let massive type and whitespace create structure

### Navigation
- Style: Top bar — name/initials left, nav links right
- Items: How I Build, Work, Experience, Contact (4 links to section anchors)
- Scroll behavior: Hide on scroll down, reveal on scroll up
- Mobile: Collapse to hamburger icon, opens full-screen overlay with large nav links
- Nav gets backdrop blur or subtle background when floating over content

### Claude's Discretion
- Exact spacing token scale (8, 16, 24, 32, 48, 64, 80, 96, etc.)
- Nav transition timing and easing
- Hamburger icon design and overlay animation
- Whether name appears as "NS" initials or "Naqeebali Shamsi" in nav bar
- Exact letter-spacing value within the 0.05-0.1em range
- Font loading strategy details beyond font-display: swap

</decisions>

<specifics>
## Specific Ideas

- Color palette sourced from Coolors: #32292F, #99E1D9, #F0F7F4, #70ABAF, #705D56
- Warm editorial feel — "like a design book" — not cold/clinical
- Feature sections (hero, case study) break from the warm background with contrasting bands
- The massive uppercase headings + moderate spacing creates a bold editorial rhythm — dense but impactful

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-design-system*
*Context gathered: 2026-03-18*
