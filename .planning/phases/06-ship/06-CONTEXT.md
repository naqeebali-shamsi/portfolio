# Phase 6: Ship - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Take the completed portfolio live — mobile responsive layout, performance optimization, SEO markup, and Vercel deployment readiness. The site ships at naqeebali.me, fast on mobile, findable by search engines, passing performance budget. No new features or sections — polish and ship what exists.

</domain>

<decisions>
## Implementation Decisions

### Mobile hero adaptation
- Text-only hero on mobile — no 3D, no CSS fallback visual element
- Name + typewriter + tagline only, clean and fast
- Matches blunar.cz's minimal mobile hero approach

### Breakpoint strategy
- Three breakpoints: 640px (mobile), 1024px (tablet), 1280px (desktop)
- Refined tablet experience rather than simple mobile/desktop split

### Case study mobile layout
- Claude's discretion on how case study section adapts
- Device frames, architecture diagram, and full-width breakouts need mobile treatment

### Blunar.cz resemblance
- Close match to blunar.cz mobile feel — study their spacing, typography scale, and section rhythm
- Not a pixel copy, but same premium whitespace philosophy applied to our content

### Performance budget
- 200KB gzipped initial bundle is a target, not a hard blocker
- Don't block shipping if slightly over — optimize but be pragmatic
- Placeholder images for now (screenshots, OG image) — replace later

### Font optimization
- Claude's discretion on font subsetting — judge whether font payload is a problem and subset if needed

### Lighthouse priorities
- Claude's discretion on which Lighthouse categories to prioritize
- Target 90+ across all four, optimize based on what's realistic for this site

### Meta description
- Spirit of current site copy: rotating roles (Cloud Developer, Solution Architect, Full Stack Developer) + "I make tech work harder so you don't have to"
- Claude writes compelling meta copy in this voice

### OG image
- Auto-generated card at build time — name + title + brand colors
- Premium feel, consistent with site design language

### JSON-LD schema
- Claude's discretion on depth — include what's useful for search presence without over-sharing

### Page title
- Claude's discretion — optimize for search ranking and social sharing

### Deployment
- Localhost development only for this phase — no actual Vercel deployment
- Domain already on Vercel from current site — deployment steps documented but not executed
- No analytics for now
- No environment variables or secrets needed — fully static site

### Claude's Discretion
- Case study mobile adaptation approach
- Font subsetting decision
- Lighthouse category prioritization
- JSON-LD schema depth
- Page title format
- OG image generation tooling

</decisions>

<specifics>
## Specific Ideas

- "Close match to blunar.cz mobile" — study their responsive patterns for spacing, typography scale, and section rhythm
- Current site at naqeebali.me rotates roles and uses tagline "I make tech work harder so you don't have to" — carry this voice into meta content
- User loves the split-flap/Solari airport display style for rotating titles (deferred — see below)

</specifics>

<deferred>
## Deferred Ideas

- **Split-flap (Solari board) animation** for title rotation — user wants the classic airport departure board style instead of typewriter. This is a hero animation change, not a shipping concern. Candidate for a future polish phase.

</deferred>

---

*Phase: 06-ship*
*Context gathered: 2026-03-20*
