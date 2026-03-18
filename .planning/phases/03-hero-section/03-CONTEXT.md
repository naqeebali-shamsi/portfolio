# Phase 3: Hero Section - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

The hero section is the landing moment — full viewport, split layout with text on the left and a 3D geometric element on the right. Displays name, rotating typewriter titles, and a single tagline. Includes a React Three Fiber 3D element with lazy loading, device detection for a CSS fallback, and WebGL disposal on scroll-past. Scroll animations and cursor interactions belong to Phase 4 and Phase 5 respectively.

</domain>

<decisions>
## Implementation Decisions

### Hero layout & typography
- Split layout — text left, 3D element right, two clear visual zones
- Name "Naqeebali Shamsi" in massive display size (6xl-8xl range) — the name commands the hero
- Single punchy tagline line below the typewriter (not multi-line)
- Full viewport height (100vh) — hero owns the entire screen

### Typewriter behavior
- Classic type-and-delete pattern — types out a title, pauses, backspaces, types next
- Fast & snappy speed — quick typing, short pauses between titles, energetic feel
- Titles to cycle: Cloud Developer, Solution Architect, Full Stack Developer
- Loops infinitely through the three titles

### 3D geometric element
- Single icosahedron (20-faced polyhedron) — not a cluster of shapes
- Glass/refraction material — transparent with light bending through it
- Accent-tinted glass — refracts the portfolio's accent colors, ties into design system
- Gentle cursor follow — shape slowly rotates to face cursor position, not aggressive
- Slow ambient rotation when cursor is idle — never static
- Equal visual weight with text — true 50/50 split, the 3D is a co-star not a backdrop
- Quality bar reference: henryheffernan.com level of craft (different approach, same polish)

### CSS fallback
- Shows on low-end devices only (<4 CPU cores or <4GB RAM) — most visitors get full 3D
- Subtle CSS animation — the fallback still feels alive, not a dead placeholder
- Instant swap when 3D finishes loading — no crossfade, just replace

### Claude's Discretion
- Typewriter cursor style (pipe, underscore, or block — whatever looks best with Space Grotesk)
- Specific CSS fallback design (gradient orb, geometric outline, or mesh — should complement the glass icosahedron aesthetic)
- Exact typewriter timing values (type speed, delete speed, pause duration)
- Text/3D split ratio within the layout
- Tagline copy

</decisions>

<specifics>
## Specific Ideas

- henryheffernan.com as quality reference — the 3D should feel that polished, even though it's a different approach (geometric vs scene)
- Glass icosahedron with accent color tinting — the 3D element should feel connected to the design system, not generic
- "Fast & snappy" typewriter — energetic, confident developer energy, not contemplative

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-hero-section*
*Context gathered: 2026-03-18*
