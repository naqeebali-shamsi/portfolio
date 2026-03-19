---
phase: 04-scroll-animations
plan: 02
subsystem: ui
tags: [gsap, parallax, pin-and-scrub, hover, micro-interactions, a11y]

# Dependency graph
requires:
  - phase: 04-scroll-animations/01
    provides: GSAP infrastructure, ScrollTrigger registration, data-reveal pattern
  - phase: 02-content-sections
    provides: Section components (CaseStudy, Experience, Navbar, SocialLinks)

provides:
  - Hero parallax depth effect (text + visual at different scroll speeds)
  - Case study pin-and-scrub sequential reveal on desktop
  - Nav link animated underline hover effect
  - Experience timeline expand-on-hover with tech stack and achievement
  - Social link scale-on-hover
  - Case study card lift + shadow hover

affects:
  - phase: 05 (polish/performance) — animations now complete, ready for performance audit
  - phase: 06 (deploy) — all interactive behaviors are in place

# Tech tracking
tech-stack:
  added: []
  patterns:
    - gsap.matchMedia with named conditions (desktop/mobile) for responsive animations
    - Pin-and-scrub timeline pattern with fromTo for scrubbed animations
    - GSAP contextSafe for complex hover animations (Experience expand)
    - CSS transitions for simple single-property hovers (nav underline, social scale, card lift)
    - "@media (hover: hover)" guard for touch device compatibility

# File tracking
key-files:
  created: []
  modified:
    - src/components/Hero/Hero.tsx
    - src/sections/CaseStudy.tsx
    - src/sections/Experience.tsx
    - src/components/Navbar/Navbar.tsx
    - src/components/SocialLinks.tsx
    - src/data/content.ts

# Decisions
decisions:
  - CSS for simple hovers, GSAP for complex multi-property animations
  - Pin on section element itself (not nested child) to avoid pin-spacer layout breaks
  - pointerenter/pointerleave with hover media query check instead of mouseover for touch safety
  - techStack and keyAchievement added to Experience interface for hover detail expansion

# Metrics
duration: 5min
completed: 2026-03-19
---

# Phase 04 Plan 02: Parallax, Pin-and-Scrub, and Hover Micro-Interactions Summary

Subtle depth parallax on Hero (text drifts +5%, visual drifts -10%), desktop pin-and-scrub case study revealing intro/architecture/approach sequentially, plus CSS and GSAP hover micro-interactions on nav links, timeline entries, social icons, and case study card.

## What Was Done

### Task 1: Hero Parallax + Case Study Pin-and-Scrub

- Added `useGSAP` to Hero.tsx with parallax on text (`yPercent: 5`) and visual (`yPercent: -10`) containers using scrubbed ScrollTrigger
- Replaced CaseStudy animations with `gsap.matchMedia` named conditions: desktop gets pin-and-scrub timeline (`scrub: 1`, `end: +=200%`), mobile keeps simple stagger reveals
- Desktop case study pins section in viewport and sequentially reveals intro, then architecture, then approach via `fromTo()` animations
- All wrapped in prefers-reduced-motion media query

### Task 2: Hover Micro-Interactions

- **Nav underline:** CSS `::after` pseudo-element with `width: 0` to `width: 100%` transition (250ms ease-reveal curve)
- **Timeline expand:** GSAP contextSafe handlers expand hidden details div showing tech stack pills and key achievement text; collapses others on enter
- **Social scale:** Tailwind `hover:scale-110 transition-all duration-200`
- **Case study card:** CSS `translateY(-4px)` + `box-shadow` on hover, gated by `@media (hover: hover)`
- Updated Experience interface and data with `techStack: string[]` and `keyAchievement: string` fields

## Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | CSS for simple hovers, GSAP contextSafe for complex | Single-property transitions don't need GSAP overhead; multi-property height:auto animation does |
| 2 | Pin on section element | Pinning nested children causes pin-spacer layout breaks with full-width breakout divs |
| 3 | pointerenter + hover media query | Prevents stuck hover states on touch devices |
| 4 | fromTo() for scrubbed animations | Avoids GSAP Pitfall 5 (immediateRender conflict with .from() in scrubbed timelines) |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- [x] `npm run build` (vite build) succeeds with zero errors
- [x] Hero parallax uses data-parallax attributes for targeting
- [x] Case study uses named matchMedia conditions for desktop/mobile split
- [x] Nav underline uses CSS ::after with ease-reveal transition
- [x] Timeline expand uses GSAP contextSafe with hover media query guard
- [x] Social links use Tailwind hover:scale-110
- [x] Case study card hover gated by @media (hover: hover)
- [x] All scroll animations respect prefers-reduced-motion

## Next Phase Readiness

All scroll animations and hover interactions are now complete. Phase 04 is done. The site has:
- Scroll reveals on all content sections (Plan 01)
- Parallax depth on Hero (Plan 02)
- Pin-and-scrub narrative on Case Study (Plan 02)
- Hover micro-interactions on nav, timeline, social, and case study (Plan 02)

Ready to proceed to Phase 05 (polish/performance) or Phase 06 (deploy).
