# Phase 2: Content Sections - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

All non-hero content sections: "How I Build" engineering philosophy, NomadCrew case study, experience timeline, and contact footer. These sections tell the visitor's story as they scroll past the hero. No animations (Phase 4), no 3D (Phase 3).

</domain>

<decisions>
## Implementation Decisions

### "How I Build" Section
- Large statement blocks with display typography — manifesto style, not cards or lists
- 2-3 bold statements only — tight and punchy, each one lands hard
- Thoughtful & measured tone — reflective rather than aggressive (e.g., "Good architecture is a series of bets on the future")
- Statements only, no supporting body text beneath them — let the words speak for themselves

### NomadCrew Case Study
- Problem → Solution → Result story arc — classic structure
- Architecture diagram + 3-4 key technical decision bullet points for technical depth (not a full deep-dive, not surface-level)
- Phone mockup screenshots placed inline within the narrative flow (in device frames)
- App store links/badges alongside the screenshots
- Full-width breakout layout — case study breaks out of the content container, feels like its own world

### Experience Timeline
- Vertical timeline format with connecting line and dots for each entry
- Each role shows: company name, title, years, and one-liner describing what was built/done
- Work experience only in the timeline (Outlier AI, Propwise, Opas Mobile, Crest Data Systems)
- Education as a separate small section below the timeline — visually distinct
- Two degrees: Master's from Dalhousie University, Bachelor's from Charotar University

### Contact Section
- Full-height viewport footer — dramatic final screen with generous whitespace
- Bold/direct CTA — large display element, no ambiguity (e.g., email as large text or "Hire me")
- Click-to-copy interaction for email — clicking copies to clipboard with confirmation animation
- Social links as icon row — reuse existing icon components from current portfolio codebase
- Social links: LinkedIn, GitHub, Twitter/X

### Claude's Discretion
- Exact copy for "How I Build" statements (within the tone/count constraints)
- Architecture diagram style and level of detail for NomadCrew
- Timeline dot/line styling details
- Contact section whitespace distribution and exact CTA wording
- Section ordering and transition spacing between sections

</decisions>

<specifics>
## Specific Ideas

- "How I Build" should feel like reading bold pullquotes from a founder's letter — not a resume skills section
- NomadCrew case study should feel immersive when you hit that section — the full-width breakout signals "this is the real work"
- Social icons should be pulled from the existing portfolio codebase rather than rebuilt
- The contact section being full-height creates a strong final impression — "this is where you act"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-sections*
*Context gathered: 2026-03-18*
