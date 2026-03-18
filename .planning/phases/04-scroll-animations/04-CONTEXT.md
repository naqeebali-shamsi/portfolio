# Phase 4: Scroll Animations - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Scroll-driven motion for every section — GSAP ScrollTrigger reveals, parallax, text staggers, and hover micro-interactions. The site goes from static to alive. No new content or layout changes — purely layering animation onto existing sections from Phases 1-3.

</domain>

<decisions>
## Implementation Decisions

### Section reveal style
- Mixed reveal types per section — different animations for different content types (e.g. fade+slide for text, clip for case study, scale for timeline)
- Stagger children for content-heavy sections (How I Build, Timeline) but group reveal for simpler ones (Contact)
- Animations trigger once only — no replay on scroll back up
- Trigger timing: Claude's discretion per section based on content height and visual weight

### Parallax & depth
- Subtle intensity (5-15%) — barely noticeable depth shift, Apple product page style
- Parallax on Hero + Case Study sections only — other sections scroll normally
- Both layers move — background elements at different speed AND foreground text/cards at slightly different speed for depth sandwich
- Case study gets pin-and-scrub treatment — pins in place while problem, approach, architecture reveal sequentially as user scrolls through

### Hover micro-interactions
- Navigation links: animated underline that slides in from left on hover, slides out on leave
- Case study / project elements: lift + shadow — card lifts ~4px with expanding shadow
- Social links: extract hover animation logic from existing Framer + shadcn social component in the codebase and adapt for minimal icon setup
- Experience timeline: expand on hover — hovered entry expands to show additional details (tech stack, key achievement), others stay compact

### Animation personality
- Smooth and elegant feel — slow ease-out curves (cubic-bezier(0.16, 1, 0.3, 1)), durations 600-800ms for scroll reveals
- Hover transitions are faster (200-300ms) for immediate feedback — different tempo than scroll animations
- prefers-reduced-motion: all animations disabled completely, content appears instantly
- References: Apple product pages and blunar.cz for scroll feel inspiration

### Claude's Discretion
- Exact ScrollTrigger start/end positions per section
- Specific easing variations per animation type
- Stagger delay values between child elements
- Parallax speed ratios for foreground vs background layers
- Pin-and-scrub scroll distance for case study

</decisions>

<specifics>
## Specific Ideas

- "Apple product pages and blunar.cz" as animation reference — smooth, scroll-driven storytelling with premium feel
- Social link hover logic already exists in the codebase as a Framer + shadcn component — extract and adapt rather than building from scratch
- Timeline entries should expand to reveal tech stack and key achievements on hover — acts as progressive disclosure
- Case study pin-and-scrub creates a mini storytelling experience within the scroll

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-scroll-animations*
*Context gathered: 2026-03-19*
