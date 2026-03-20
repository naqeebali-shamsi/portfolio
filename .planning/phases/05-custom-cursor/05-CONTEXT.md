# Phase 5: Custom Cursor - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the default system cursor with a custom hollow ring cursor on desktop viewports. The ring morphs contextually when hovering interactive elements. Touch/mobile devices keep the default system cursor. No new content or layout changes — purely layering a cursor effect onto the existing site.

</domain>

<decisions>
## Implementation Decisions

### Cursor appearance
- Hollow ring, no inner dot — ~24px diameter, 1.5px stroke
- Color: near-black matching text color (#1a1a1a or equivalent from theme)
- mix-blend-difference so ring inverts over dark backgrounds (case study full-width sections)
- Subtle opacity (~0.5) at rest, becomes fully opaque during hover morphs
- Default system cursor hidden via `cursor: none` on the body (desktop only)

### Morph behaviors
- **Links & nav items:** Claude's discretion — pick what pairs best with existing underline/color hover effects (grow+fill, grow-only, or shrink-to-dot)
- **Case study / project card:** Claude's discretion — pick the most premium approach (text mask, large expand, or magnetic pull)
- **Regular text (paragraphs, headings):** Ring contracts slightly (~18px) to feel less intrusive while reading
- **3D hero element:** No special behavior — ring stays default, the icosahedron already follows cursor
- **Social links, timeline entries:** Should complement existing hover micro-interactions from Phase 4

### Animation personality
- **Follow style:** Instant follow — ring locked to cursor position, no lag/lerp
- **Morph transition speed:** Quick (~200ms) matching Phase 4 hover transition tempo
- **Morph easing:** Snappier spring curve — differentiate cursor morphs from the smooth scroll animations (which use cubic-bezier(0.16, 1, 0.3, 1))
- No trailing/physics — cursor is responsive, not floaty

### Interaction states
- **Click/mousedown:** Scale-down pulse — ring shrinks ~80% on mousedown, springs back on release. Tactile press feedback.
- **Window exit:** Ring fades to 0 opacity when cursor exits the viewport. Clean disappearance.
- **prefers-reduced-motion:** Keep the custom ring visible but disable morph transitions — instant state changes instead of animated morphs
- **Touch/mobile:** Custom cursor not rendered at all (desktop viewport + pointer:fine only)

### Claude's Discretion
- Exact spring curve parameters for morph easing
- Which morph style for links (grow+fill vs grow-only vs shrink-to-dot)
- Which morph style for project cards (text mask vs large expand vs magnetic)
- Ring size when contracted over text
- Opacity transition curve on window exit
- How to handle the cursor over the nav overlay on mobile (should be hidden anyway)
- z-index strategy to keep cursor above all content

</decisions>

<specifics>
## Specific Ideas

- mix-blend-difference keeps ring visible on both the light background and dark case study sections
- Instant follow (no lerp) chosen deliberately — the site's personality comes from scroll animations, not cursor physics
- Snappier spring easing for morphs creates a different "voice" for the cursor vs the smooth scroll reveals
- Scale-down pulse on click gives tactile feedback without requiring click-triggered animations on page elements

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-custom-cursor*
*Context gathered: 2026-03-20*
