# Phase 5: Custom Cursor - Research

**Researched:** 2026-03-20
**Domain:** Custom cursor implementation with GSAP in React/TypeScript
**Confidence:** HIGH

## Summary

The custom cursor phase layers a hollow ring element over the page that tracks the mouse position instantly (no lerp) and morphs contextually when hovering interactive elements. GSAP provides two purpose-built APIs for this: `gsap.quickSetter()` for instant position updates and `gsap.to()` for morph transitions. The project already uses GSAP 3.14.2 with `@gsap/react` 2.1.2, `gsap.matchMedia()` patterns throughout, and `contextSafe` for event-driven animations -- all directly applicable.

The cursor is a single fixed-position `div` rendered at the App level, hidden on touch/mobile via `pointer:fine` media query. `mix-blend-mode: difference` handles visibility across light and dark backgrounds. No new dependencies needed.

**Primary recommendation:** Use `gsap.quickSetter()` for instant x/y positioning on mousemove, `gsap.to()` for morph transitions (scale, opacity, border changes), and `data-cursor` attributes on interactive elements to declaratively specify morph behavior.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Position tracking + morph animations | Already installed; quickSetter/quickTo are purpose-built for cursor |
| @gsap/react | 2.1.2 | useGSAP hook for lifecycle + cleanup | Already installed; handles React cleanup automatically |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| gsap.quickSetter() | Instant x/y position setting on mousemove | Every frame -- 50-250% faster than gsap.set() |
| gsap.to() | Morph transitions (scale, opacity, width/height) | On mouseenter/mouseleave of interactive elements |
| gsap.matchMedia() | Desktop-only activation with pointer:fine | Entire cursor system wrapped in matchMedia |
| CSS mix-blend-mode: difference | Ring visibility on any background | Applied to cursor element |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| quickSetter for position | quickTo with duration:0 | quickSetter is more direct for instant follow |
| quickSetter for position | CSS transform via direct style | GSAP handles will-change and GPU compositing |
| gsap.to for morphs | CSS transitions | Less control over easing; GSAP already in stack |
| data-cursor attributes | React context/state | Attributes are simpler, no re-renders, work with any element |

**No new installation needed.** All tools are already in the project.

## Architecture Patterns

### Recommended Component Structure
```
src/
  components/
    CustomCursor.tsx      # The cursor component (ring element + all logic)
  hooks/
    (no new hooks needed -- logic lives in component with useGSAP)
  styles/
    base.css              # Add cursor:none rule for desktop
```

### Pattern 1: Single Cursor Component at App Level
**What:** One `<CustomCursor />` component rendered in App.tsx, outside the main content tree. Uses a portal-free fixed-position div with `pointer-events: none`.
**When to use:** Always -- there should be exactly one cursor element.
**Example:**
```tsx
// App.tsx
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <CustomCursor />
      <Navbar />
      <main>...</main>
    </div>
  );
}
```

### Pattern 2: quickSetter for Instant Position Tracking
**What:** Create quickSetter functions for x and y once, call them on every mousemove. This is GSAP's recommended approach for high-frequency property updates.
**When to use:** For the cursor position (instant follow, no lag).
**Example:**
```tsx
// Inside useGSAP callback
const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

const onMouseMove = (e: MouseEvent) => {
  xSet(e.clientX);
  ySet(e.clientY);
};

window.addEventListener("mousemove", onMouseMove);
// cleanup returned automatically by useGSAP context
return () => window.removeEventListener("mousemove", onMouseMove);
```

### Pattern 3: data-cursor Attributes for Declarative Morph Targets
**What:** Interactive elements get `data-cursor="link"` or `data-cursor="project"` attributes. The cursor component uses event delegation on `document` to detect hovers and trigger morphs.
**When to use:** For all morph behaviors -- avoids coupling cursor logic to individual components.
**Example:**
```tsx
// In any component -- no cursor imports needed
<a href="/project" data-cursor="link">View Project</a>
<div data-cursor="project" className="project-card">...</div>
<p data-cursor="text">Regular paragraph</p>
```

```tsx
// In CustomCursor.tsx -- event delegation
const onMouseOver = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest("[data-cursor]");
  if (!target) {
    // Reset to default state
    morphTo("default");
    return;
  }
  const cursorType = target.getAttribute("data-cursor");
  morphTo(cursorType);
};

document.addEventListener("mouseover", onMouseOver);
```

### Pattern 4: matchMedia for Desktop-Only Activation
**What:** Wrap the entire cursor system in `gsap.matchMedia()` with `(pointer: fine) and (min-width: 768px)`. When conditions don't match, all GSAP animations and listeners are automatically reverted.
**When to use:** Always -- this is the gating mechanism for touch/mobile.
**Example:**
```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(pointer: fine) and (min-width: 768px)", (context) => {
    // Show cursor element
    gsap.set(cursorRef.current, { autoAlpha: 0.5 });

    // Set up quickSetters, event listeners, morphs
    // ...

    return () => {
      // Cleanup listeners -- matchMedia auto-reverts GSAP tweens
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      // etc.
    };
  });
}, { scope: cursorRef });
```

### Pattern 5: Morph State Machine
**What:** A simple function that maps cursor types to GSAP animation targets. Each morph is a `gsap.to()` call targeting the cursor element.
**When to use:** For all state transitions (default, link, project, text, click).
**Example:**
```tsx
const morphTo = (type: string | null) => {
  const base = { duration: 0.2, ease: "back.out(2)" }; // snappy spring-like

  switch (type) {
    case "link":
      gsap.to(cursorRef.current, {
        ...base,
        width: 48, height: 48,
        borderWidth: 1.5,
        backgroundColor: "rgba(26,26,26,0.08)",
        opacity: 1,
      });
      break;
    case "project":
      gsap.to(cursorRef.current, {
        ...base,
        width: 80, height: 80,
        borderWidth: 1,
        opacity: 1,
      });
      break;
    case "text":
      gsap.to(cursorRef.current, {
        ...base,
        width: 18, height: 18,
        opacity: 0.6,
      });
      break;
    default:
      gsap.to(cursorRef.current, {
        ...base,
        width: 24, height: 24,
        borderWidth: 1.5,
        backgroundColor: "transparent",
        opacity: 0.5,
      });
  }
};
```

### Anti-Patterns to Avoid
- **React state for cursor position:** Never use `useState` for x/y -- causes 60+ re-renders/second. Use refs + GSAP quickSetter.
- **Separate components for each morph state:** One element, animated via GSAP properties. Don't mount/unmount elements.
- **CSS transitions for position:** CSS transitions on `left/top` cause layout thrashing. GSAP transforms (x/y) are compositor-only.
- **Individual mouseenter/mouseleave on each element:** Use event delegation on `document` instead. Scales to any number of elements without manual wiring.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| High-perf position tracking | Manual RAF loop with style.transform | gsap.quickSetter() | Handles GPU compositing, unit conversion, 50-250% faster than gsap.set() |
| Touch device detection | navigator.userAgent sniffing | CSS media query `(pointer: fine)` via matchMedia | UA sniffing is unreliable, media query is the standard |
| Animation cleanup in React | Manual cleanup tracking | useGSAP + matchMedia auto-revert | Prevents memory leaks, handles hot-reload |
| Cursor centering | Manual width/height offset calc | CSS `translate(-50%, -50%)` or GSAP xPercent/yPercent | Stays centered regardless of morph size |

**Key insight:** GSAP already has purpose-built APIs for every cursor need. The custom part is the morph design, not the animation plumbing.

## Common Pitfalls

### Pitfall 1: Cursor Blocks Click Events
**What goes wrong:** The cursor div intercepts pointer events, making links/buttons unclickable.
**Why it happens:** Fixed-position element sits above content in z-order.
**How to avoid:** Always set `pointer-events: none` on the cursor element. This is non-negotiable.
**Warning signs:** Links stop working after adding cursor component.

### Pitfall 2: Cursor Visible on Mobile/Touch
**What goes wrong:** A floating ring appears on touch devices, stuck in one position.
**Why it happens:** Component renders on all devices, or matchMedia condition is wrong.
**How to avoid:** Use `(pointer: fine)` media query. Also conditionally render the element itself (not just visibility).
**Warning signs:** Test on mobile viewport or touch emulation.

### Pitfall 3: Memory Leak from Event Listeners
**What goes wrong:** mousemove/mouseover listeners pile up on hot-reload or navigation.
**Why it happens:** Listeners added but not cleaned up when component unmounts.
**How to avoid:** Return cleanup from useGSAP's matchMedia callback. All GSAP tweens inside matchMedia are auto-reverted, but `addEventListener` calls need manual cleanup.
**Warning signs:** Performance degrades over time in dev mode.

### Pitfall 4: Cursor Jitter at mix-blend-mode Boundaries
**What goes wrong:** Cursor flickers when crossing between light and dark sections.
**Why it happens:** `mix-blend-mode: difference` recalculates on every pixel.
**How to avoid:** Use `will-change: transform` on cursor element (GSAP sets this automatically). Ensure cursor is a simple shape (no complex children).
**Warning signs:** Visible flicker at section boundaries.

### Pitfall 5: Morph Conflicts from Rapid Hover
**What goes wrong:** Cursor gets stuck in wrong morph state when hovering quickly between elements.
**Why it happens:** mouseenter/mouseleave fire in unexpected order with fast movement.
**How to avoid:** Use `mouseover` with event delegation + `closest("[data-cursor]")` rather than paired enter/leave on each element. The mouseover fires on every target change, so you always get the current state.
**Warning signs:** Cursor stays enlarged after moving off a link.

### Pitfall 6: cursor:none Not Applied Correctly
**What goes wrong:** Default cursor still visible alongside custom ring.
**Why it happens:** Some elements override cursor style, or rule specificity is too low.
**How to avoid:** Use `*, *::before, *::after { cursor: none !important; }` scoped inside a matchMedia-controlled class on `<html>`. Remove class when matchMedia doesn't match.
**Warning signs:** Native cursor visible next to custom ring.

### Pitfall 7: Scroll Position Offset
**What goes wrong:** Cursor position is offset when page is scrolled.
**Why it happens:** Using `pageX/pageY` instead of `clientX/clientY` with a fixed-position element.
**How to avoid:** Always use `e.clientX` / `e.clientY` since the cursor element uses `position: fixed`.
**Warning signs:** Cursor drifts from mouse after scrolling.

## Code Examples

### Complete Cursor Element Setup
```tsx
// CustomCursor.tsx
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cursorRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)',
        desktopReduced: '(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop } = context.conditions!;

        // Show cursor, hide system cursor
        gsap.set(el, { autoAlpha: 0.5 });
        document.documentElement.classList.add('custom-cursor-active');

        // Instant position tracking
        const xSet = gsap.quickSetter(el, 'x', 'px');
        const ySet = gsap.quickSetter(el, 'y', 'px');

        const onMouseMove = (e: MouseEvent) => {
          xSet(e.clientX);
          ySet(e.clientY);
        };

        // Morph function
        const morphTo = (type: string | null) => {
          const duration = desktop ? 0.2 : 0; // instant if reduced motion
          const ease = desktop ? 'back.out(2)' : 'none';
          // ... morph switch cases
        };

        // Event delegation for morphs
        const onMouseOver = (e: MouseEvent) => {
          const target = (e.target as HTMLElement).closest('[data-cursor]');
          morphTo(target?.getAttribute('data-cursor') ?? null);
        };

        // Click feedback
        const onMouseDown = () => {
          gsap.to(el, { scale: 0.8, duration: 0.1, ease: 'power2.in' });
        };
        const onMouseUp = () => {
          gsap.to(el, { scale: 1, duration: 0.25, ease: 'back.out(3)' });
        };

        // Window exit
        const onMouseLeave = () => {
          gsap.to(el, { autoAlpha: 0, duration: 0.15 });
        };
        const onMouseEnter = () => {
          gsap.to(el, { autoAlpha: 0.5, duration: 0.15 });
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseleave', onMouseLeave);
        document.documentElement.addEventListener('mouseenter', onMouseEnter);

        return () => {
          document.documentElement.classList.remove('custom-cursor-active');
          window.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseover', onMouseOver);
          window.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mouseup', onMouseUp);
          document.documentElement.removeEventListener('mouseleave', onMouseLeave);
          document.documentElement.removeEventListener('mouseenter', onMouseEnter);
        };
      }
    );
  }, { scope: cursorRef });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-current mix-blend-difference"
      style={{
        width: 24,
        height: 24,
        visibility: 'hidden', // useGSAP autoAlpha controls this
        color: '#1a1a1a',
      }}
    />
  );
}
```

### CSS for Hiding System Cursor
```css
/* In base.css */
.custom-cursor-active,
.custom-cursor-active *,
.custom-cursor-active *::before,
.custom-cursor-active *::after {
  cursor: none !important;
}
```

### data-cursor Attribute Usage
```tsx
// Links -- add to Navbar, Contact, etc.
<a href="#" data-cursor="link">About</a>

// Project cards
<div data-cursor="project" className="project-card">...</div>

// Text paragraphs (optional -- only if text contraction is desired)
<p data-cursor="text">Some paragraph text...</p>
```

## Morph Style Recommendations (Claude's Discretion)

### Links and Nav Items: Grow + Subtle Fill
**Recommendation:** Ring grows from 24px to 48px with a faint background fill (rgba with ~8% opacity). This complements the existing CSS underline/color hover effects without competing.
**Rationale:** Shrink-to-dot feels like disappearing. Grow-only has no visual weight change. Grow+fill adds a gentle emphasis that pairs with the underline expanding below.

### Project Cards: Large Expand
**Recommendation:** Ring expands to ~80px with thinner border (1px). No text mask (too complex for minimal benefit). Optionally add a subtle "View" text label inside via a child span that fades in.
**Rationale:** Text mask requires clip-path trickery and careful font sizing -- high complexity for a small detail. Large expand is visually dramatic but simple to implement. Works well with the card's own translateY hover from Phase 4.

### Spring Curve Parameters
**Recommendation:** `back.out(2)` for morph easing. This gives a slight overshoot that feels snappy/spring-like without requiring a physics engine. Duration 0.2s.
**Rationale:** GSAP's built-in `back.out()` with strength 2 creates a perceptible but subtle overshoot. It's visually distinct from the `power3.out` used for scroll reveals, giving the cursor its own "voice."

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS `left`/`top` positioning | GSAP x/y transforms via quickSetter | GSAP 3.0 (2019) | No layout thrashing, GPU-composited |
| Manual RAF loops for cursor | gsap.quickSetter() / gsap.quickTo() | GSAP 3.4+ | Built-in performance optimization |
| Individual hover listeners | Event delegation with closest() | Long-standing pattern | Scales to dynamic content, less coupling |
| JS touch detection (UA sniffing) | CSS `(pointer: fine)` media query | Wide support since ~2020 | Reliable, no JS needed |

**Deprecated/outdated:**
- `TweenMax`/`TweenLite`: Replaced by unified `gsap` object in v3
- Using `pageX`/`pageY` for fixed-position elements: Use `clientX`/`clientY`

## Open Questions

1. **mix-blend-mode: difference vs mix-blend-mode: exclusion**
   - What we know: `difference` inverts colors, `exclusion` is softer. Both make ring visible on any background.
   - What's unclear: Which looks better with this specific color palette (#1a1a1a on light bg, inverting on dark case study sections).
   - Recommendation: Start with `difference` as decided in context. Test visually and switch to `exclusion` if the inversion is too harsh.

2. **z-index conflicts with navbar overlay**
   - What we know: Navbar likely has high z-index for mobile overlay.
   - What's unclear: Exact z-index values in use.
   - Recommendation: Use `z-[9999]` for cursor. Since cursor has `pointer-events: none`, it won't interfere with navbar functionality even if above it.

3. **prefers-reduced-motion with morphs**
   - What we know: Context says "keep ring visible, disable morph transitions."
   - What's unclear: Whether instant state changes (duration: 0) look janky or acceptable.
   - Recommendation: Use duration: 0 for position, but keep a very short duration (0.05s) for morph state changes to avoid visual popping.

## Sources

### Primary (HIGH confidence)
- [GSAP quickTo() docs](https://gsap.com/docs/v3/GSAP/gsap.quickTo()/) - API details, performance notes
- [GSAP quickSetter() docs](https://gsap.com/docs/v3/GSAP/gsap.quickSetter()/) - API details, 50-250% perf improvement
- [GSAP matchMedia() docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) - Desktop-only activation pattern
- Existing codebase: `src/lib/gsap.ts`, `src/sections/Experience.tsx`, `src/sections/CaseStudy.tsx` - Established GSAP patterns

### Secondary (MEDIUM confidence)
- [Olivier Larose - Blend Mode Cursor tutorial](https://blog.olivierlarose.com/tutorials/blend-mode-cursor) - mix-blend-mode implementation with React/GSAP
- [GreenSock CodePen - quickSetter mouse follower](https://codepen.io/GreenSock/pen/WNNNBpo) - Official example
- [GreenSock CodePen - quickTo cursor](https://codepen.io/GreenSock/pen/dyjywaZ) - Official example

### Tertiary (LOW confidence)
- [Medium - Custom Cursor with GSAP and React](https://medium.com/@amilmohd155/elevate-your-ux-build-a-smooth-custom-cursor-with-gsap-and-react-b2a1bb1c01e8) - Community pattern reference
- [Diona Rodrigues - Custom cursor follower](https://dionarodrigues.dev/blog/how-create-a-custom-cursor-follower-with-gsap) - Additional implementation reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - GSAP is already in use; quickSetter/quickTo are documented APIs
- Architecture: HIGH - Pattern follows existing codebase conventions (useGSAP, matchMedia, contextSafe)
- Pitfalls: HIGH - Well-documented issues (pointer-events, clientX vs pageX, event cleanup)
- Morph recommendations: MEDIUM - Subjective design choices; will need visual testing

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable -- GSAP 3.x API is mature)
