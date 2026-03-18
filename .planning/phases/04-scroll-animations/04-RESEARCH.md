# Phase 4: Scroll Animations - Research

**Researched:** 2026-03-19
**Domain:** GSAP ScrollTrigger, scroll-driven animations, micro-interactions in React
**Confidence:** HIGH

## Summary

This phase layers scroll-driven animation onto existing static sections using GSAP ScrollTrigger. The project already has GSAP 3.14.2 installed and uses it for the Hero typewriter effect (via `gsap.context()` pattern). The official `@gsap/react` package (providing `useGSAP` hook) is NOT yet installed and should be added -- it provides automatic cleanup, scoping, and `contextSafe` for event handlers, which is critical for React 18 strict mode compatibility.

The architecture pattern is: register ScrollTrigger globally once, create a reusable animation hook/utility, then apply per-section ScrollTrigger configurations. The case study pin-and-scrub is the most complex piece -- it pins the section and progressively reveals content as the user scrolls through. All animations must be wrapped in `gsap.matchMedia()` to respect `prefers-reduced-motion`.

**Primary recommendation:** Install `@gsap/react`, register ScrollTrigger + useGSAP once at app entry, build a thin `useScrollReveal` hook for common patterns, and implement each section's animations in its own `useGSAP` call with proper scoping.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Animation engine | Already installed, industry standard for scroll animation |
| gsap/ScrollTrigger | (bundled) | Scroll-linked animations | Official GSAP plugin for trigger, pin, scrub |
| @gsap/react | ^2.1.2 | React integration hook | Official React adapter with auto-cleanup, contextSafe, scoping |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gsap/ScrollToPlugin | (bundled) | Smooth scroll-to | Only if nav links need smooth scroll (optional) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @gsap/react useGSAP | Manual gsap.context() in useEffect | useGSAP handles SSR, strict mode, cleanup automatically -- manual approach is error-prone |
| ScrollTrigger | Intersection Observer | IO only triggers enter/exit, no scrub/pin/progress -- insufficient for this phase |

**Installation:**
```bash
npm install @gsap/react
```

Note: `gsap` 3.14.2 is already installed. ScrollTrigger is bundled with gsap and imported from `gsap/ScrollTrigger`.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   └── gsap.ts              # GSAP plugin registration (single place)
├── hooks/
│   └── useScrollReveal.ts   # Reusable scroll-reveal helper (optional thin wrapper)
├── sections/
│   ├── HowIBuild.tsx        # Each section owns its own useGSAP call
│   ├── CaseStudy.tsx         # Pin-and-scrub animation
│   ├── Experience.tsx        # Stagger children reveals
│   └── Contact.tsx           # Simple group reveal
└── App.tsx                   # Import gsap.ts to ensure registration
```

### Pattern 1: Global Plugin Registration
**What:** Register all GSAP plugins once at the app entry point
**When to use:** Always -- must happen before any component uses ScrollTrigger
**Example:**
```typescript
// src/lib/gsap.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```
```typescript
// src/App.tsx (or main.tsx)
import '@/lib/gsap'; // side-effect import ensures registration
```

### Pattern 2: Per-Section useGSAP with Scoping
**What:** Each section component owns its own animations via useGSAP with scope
**When to use:** Every section that has scroll animations
**Example:**
```typescript
// Source: https://gsap.com/resources/React/
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function HowIBuild() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduced } = context.conditions!;
        if (reduced) return; // Skip all animations

        gsap.from('.statement', {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    );
  }, { scope: sectionRef });

  return <section ref={sectionRef}>...</section>;
}
```

### Pattern 3: Pin-and-Scrub for Case Study
**What:** Pin section in viewport, scrub through a timeline that reveals content sequentially
**When to use:** Case study section -- problem, approach, architecture reveal in sequence
**Example:**
```typescript
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,        // smooth 1s catch-up
        start: 'top top',
        end: '+=200%',   // scroll distance = 2x section height
        // pinSpacing: true (default) -- adds spacer div
      },
    });

    // Sequential reveals within pinned section
    tl.from('.cs-problem', { opacity: 0, y: 40, duration: 1 })
      .from('.cs-approach', { opacity: 0, y: 40, duration: 1 }, '+=0.3')
      .from('.cs-architecture', { opacity: 0, y: 40, duration: 1 }, '+=0.3');
  });
}, { scope: sectionRef });
```

### Pattern 4: Parallax with ScrollTrigger
**What:** Elements move at different speeds relative to scroll
**When to use:** Hero and Case Study sections
**Example:**
```typescript
// Subtle parallax (5-15% intensity as decided)
gsap.to('.hero-bg', {
  yPercent: -10,  // moves 10% of its height
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,  // direct link to scroll, no catch-up delay
  },
});

gsap.to('.hero-text', {
  yPercent: 5,  // foreground moves opposite/slower
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

### Pattern 5: Hover Micro-Interactions with contextSafe
**What:** GSAP-powered hover animations that are properly cleaned up
**When to use:** Nav links, project cards, timeline entries (complex hovers)
**Note:** Simple hovers (color transitions, underlines) should use CSS transitions, not GSAP. GSAP is for complex multi-property or sequenced hover animations.
**Example:**
```typescript
const { contextSafe } = useGSAP({ scope: containerRef });

const onHoverIn = contextSafe((el: HTMLElement) => {
  gsap.to(el, {
    y: -4,
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    duration: 0.25,
    ease: 'power2.out',
  });
});

const onHoverOut = contextSafe((el: HTMLElement) => {
  gsap.to(el, {
    y: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    duration: 0.25,
    ease: 'power2.out',
  });
});
```

### Anti-Patterns to Avoid
- **Using useEffect instead of useGSAP:** useGSAP handles React 18 strict mode double-invocation and SSR safety automatically. Manual useEffect + gsap.context is error-prone.
- **Registering plugins in components:** Register once in a shared module, not per-component. Multiple registrations are harmless but messy.
- **Creating animations outside useGSAP without contextSafe:** Event handlers, timeouts, async callbacks create animations that won't be cleaned up. Always wrap with contextSafe.
- **Using CSS class selectors without scoping:** Without `scope`, GSAP selects from the entire document. Always pass `{ scope: containerRef }` to useGSAP.
- **Animating layout properties (width, height, top, left):** Use transforms (x, y, scale, rotation) for GPU-accelerated animation. GSAP maps these to CSS transforms automatically.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered reveals | IntersectionObserver + CSS transitions | ScrollTrigger with `once: true` | ScrollTrigger provides start/end positions, progress, stagger, and integrates with GSAP timeline |
| Parallax effect | Manual scroll listener + transform | ScrollTrigger with `scrub: true` | Manual parallax causes jank; ScrollTrigger pre-calculates positions and uses RAF |
| Pin-and-scrub sections | position: sticky + scroll event | ScrollTrigger `pin: true` + timeline | Pin-spacer management, scroll distance calculation, and timeline scrubbing are non-trivial |
| Reduced motion handling | Manual matchMedia + boolean flags | `gsap.matchMedia()` | Auto-reverts all animations when media query stops matching; handles all cleanup |
| Animation cleanup in React | Manual gsap.kill() in useEffect return | `useGSAP` hook | Tracks all GSAP objects (tweens, ScrollTriggers, timelines) and reverts on unmount |
| Staggered child animations | Manual delay calculation per element | GSAP `stagger` property | Handles variable counts, from/center/edges stagger, and eased stagger timing |

**Key insight:** GSAP + ScrollTrigger is a complete system. The biggest mistake is mixing GSAP with vanilla scroll listeners or CSS-based scroll animations -- they fight each other and produce inconsistent results.

## Common Pitfalls

### Pitfall 1: Pin-Spacer Layout Breaks
**What goes wrong:** When ScrollTrigger pins an element, it wraps it in a `pin-spacer` div with padding. This can break flexbox/grid layouts or cause unexpected spacing.
**Why it happens:** The pin-spacer adds padding equal to the scroll distance (e.g., `end: '+=200%'` adds 200% of section height as padding below).
**How to avoid:**
- Pin the outermost section element, not a nested child
- Test pin behavior with `markers: true` during development
- Use `pinSpacing: false` only if another element already accounts for the space
- If the pinned element is inside a flex container, pin the flex item not a child
**Warning signs:** Content below the pinned section jumps or overlaps after unpinning

### Pitfall 2: React 18 Strict Mode Double-Fire
**What goes wrong:** Animations run twice (or create duplicate ScrollTriggers) in development.
**Why it happens:** React 18 strict mode unmounts and remounts components to detect side effects. Without proper cleanup, ScrollTriggers stack.
**How to avoid:** Use `useGSAP` hook exclusively -- it calls `gsap.context().revert()` on cleanup automatically.
**Warning signs:** Animations appear doubled, jittery, or triggers fire at wrong scroll positions

### Pitfall 3: ScrollTrigger.refresh() Timing
**What goes wrong:** ScrollTrigger calculates positions on creation. If images load or content changes height after creation, triggers fire at wrong positions.
**Why it happens:** ScrollTrigger pre-calculates start/end positions for performance.
**How to avoid:**
- Call `ScrollTrigger.refresh()` after dynamic content loads (images, fonts, lazy components)
- Use `invalidateOnRefresh: true` on ScrollTriggers that depend on element size
- For font loading: refresh after fonts are ready (`document.fonts.ready.then(...)`)
**Warning signs:** Animations trigger too early or too late, especially on slow connections

### Pitfall 4: Animating From Invisible State Causes Flash
**What goes wrong:** Elements appear briefly at their original state before `gsap.from()` runs, causing a "flash of unstyled content."
**Why it happens:** The DOM renders before GSAP sets initial values.
**How to avoid:**
- Use `gsap.set()` to set initial invisible state immediately in useGSAP (before ScrollTrigger creation)
- Or use CSS `visibility: hidden` / `opacity: 0` on elements that will be revealed, and animate to visible
- Or use `immediateRender: true` (default for `.from()` tweens) but be aware this can conflict with ScrollTrigger -- for scrubbed animations, use `immediateRender: false`
**Warning signs:** Elements flash visible then animate in on page load

### Pitfall 5: Scrub + immediateRender Conflict
**What goes wrong:** `.from()` tweens with `scrub` immediately apply the "from" state on load, even if the ScrollTrigger hasn't activated.
**Why it happens:** `.from()` tweens default to `immediateRender: true`, but scrubbed animations should only render when scroll reaches them.
**How to avoid:** For scrubbed animations, always set `immediateRender: false` or use `.fromTo()` instead of `.from()`.
**Warning signs:** Elements start invisible/displaced even though scroll hasn't reached them

### Pitfall 6: Hover Animations on Touch Devices
**What goes wrong:** Hover states stick on mobile (tap triggers hover, doesn't clear on tap away).
**Why it happens:** Touch devices simulate mouseenter but handle mouseleave inconsistently.
**How to avoid:**
- For GSAP-powered hovers on interactive elements, wrap in a matchMedia check: `(hover: hover)` media query
- Simple hover effects (CSS transitions) are fine -- they naturally handle this
- Consider using `pointerenter`/`pointerleave` rather than `mouseenter`/`mouseleave`
**Warning signs:** Cards stay "lifted" on mobile after tapping

## Code Examples

### Complete Section Reveal Pattern
```typescript
// Verified pattern combining official GSAP React docs + ScrollTrigger API
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function ExampleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Staggered children reveal
      gsap.from('.reveal-child', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // user-specified easing
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',  // trigger when top of section hits 80% of viewport
          once: true,         // no replay on scroll back
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef}>
      <h2 className="reveal-child">Title</h2>
      <p className="reveal-child">Content</p>
    </section>
  );
}
```

### Pin-and-Scrub Case Study
```typescript
export function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    }, (context) => {
      const { desktop } = context.conditions!;
      if (!desktop) return;

      // Set initial state for scrubbed elements
      gsap.set(['.cs-approach', '.cs-architecture'], {
        opacity: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=200%',
          // markers: true,  // enable during development
        },
      });

      tl.to('.cs-problem', { opacity: 1, duration: 0.5 })
        .to('.cs-approach', { opacity: 1, y: 0, duration: 1 }, '+=0.2')
        .to('.cs-architecture', { opacity: 1, y: 0, duration: 1 }, '+=0.2');
    });

    // Mobile fallback: simple stagger, no pin
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.cs-block', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    });
  }, { scope: sectionRef });

  return <section ref={sectionRef}>...</section>;
}
```

### Animated Underline Nav Link (CSS-only, not GSAP)
```css
/* Nav link hover underline -- CSS is better for this simple effect */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--color-accent);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after {
  width: 100%;
}
```

### Timeline Expand-on-Hover
```typescript
// contextSafe for event-driven animation
const { contextSafe } = useGSAP({ scope: timelineRef });

const expandEntry = contextSafe((entry: HTMLElement) => {
  // Collapse all others first
  gsap.to('.timeline-details', { height: 0, opacity: 0, duration: 0.25 });
  // Expand target
  const details = entry.querySelector('.timeline-details') as HTMLElement;
  gsap.to(details, {
    height: 'auto',
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
  });
});
```

### gsap.matchMedia for Reduced Motion
```typescript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
const mm = gsap.matchMedia();

mm.add({
  isDesktop: '(min-width: 1024px)',
  isMobile: '(max-width: 1023px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions!;

  if (reduceMotion) {
    // All content visible immediately, no animations
    gsap.set('.reveal-child', { opacity: 1, y: 0 });
    return;
  }

  // Normal animations...
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `gsap.context()` in `useEffect` | `useGSAP()` hook from `@gsap/react` | 2023 (v2.0) | Auto cleanup, SSR safe, strict mode safe |
| `ScrollTrigger.matchMedia()` | `gsap.matchMedia()` | GSAP 3.11+ | Unified API, auto-reverts all GSAP objects not just ScrollTriggers |
| Multiple `gsap.registerPlugin()` calls | Single registration in shared module | Always been best practice | Cleaner, predictable initialization |
| `scrollTrigger.kill()` manual cleanup | `useGSAP` auto-revert | @gsap/react v2+ | No manual cleanup needed |

**Deprecated/outdated:**
- `ScrollTrigger.matchMedia()`: Replaced by `gsap.matchMedia()` which handles all GSAP objects, not just ScrollTriggers
- Manual `gsap.context()` in useEffect: Still works but `useGSAP` is the official pattern and handles edge cases

## Open Questions

1. **@gsap/react exact version compatibility with gsap 3.14.2**
   - What we know: @gsap/react 2.1.2 is the latest. gsap 3.14.2 is installed. They should be compatible as both are from GreenSock.
   - What's unclear: Exact peer dependency range (npm page returned 403, couldn't verify)
   - Recommendation: Install `@gsap/react` and verify no peer dependency warnings. LOW risk.

2. **Pin-and-scrub on mobile**
   - What we know: Pinning works on mobile but can feel sluggish or fight native scroll momentum. The CONTEXT.md does not explicitly address mobile pin behavior.
   - What's unclear: Whether the pin-and-scrub case study should fall back to simple reveals on mobile
   - Recommendation: Use `gsap.matchMedia()` to only apply pin-and-scrub on desktop (min-width: 768px), fall back to simple stagger reveals on mobile. This is reflected in the code examples above.

3. **Font loading and ScrollTrigger.refresh()**
   - What we know: The project uses @fontsource/inter and @fontsource/space-grotesk (self-hosted). These load asynchronously.
   - What's unclear: Whether font loading completes before GSAP calculates positions
   - Recommendation: Call `ScrollTrigger.refresh()` after `document.fonts.ready` to ensure correct positioning. Could be done once in App.tsx.

## Sources

### Primary (HIGH confidence)
- [GSAP React Integration Guide](https://gsap.com/resources/React/) - useGSAP hook API, scoping, contextSafe, cleanup patterns
- [ScrollTrigger API Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - trigger, start, end, pin, scrub, once, snap, toggleActions
- [gsap.matchMedia() Documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) - prefers-reduced-motion, responsive breakpoints, auto-revert

### Secondary (MEDIUM confidence)
- [GSAPify ScrollTrigger Guide](https://gsapify.com/gsap-scrolltrigger) - Community patterns, verified against official docs
- [GreenSock React GitHub](https://github.com/greensock/react) - @gsap/react source, useGSAP hook implementation
- [GSAP Community - Pin Issues in React](https://dev.to/abdulwahidkahar/how-to-fixing-gsap-scrolltrigger-pin-issue-in-react-153k) - Pin-spacer solutions in React

### Tertiary (LOW confidence)
- @gsap/react npm version 2.1.2 -- could not verify exact peer deps (npm 403)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - GSAP is already in the project, ScrollTrigger is the canonical scroll animation plugin, @gsap/react is the official React adapter
- Architecture: HIGH - Patterns verified against official GSAP React docs and ScrollTrigger API
- Pitfalls: HIGH - Pin-spacer issues, strict mode, scrub+immediateRender are well-documented in GSAP forums
- Hover interactions: MEDIUM - CSS vs GSAP split is a judgment call; simple hovers should stay CSS

**Research date:** 2026-03-19
**Valid until:** 2026-04-19 (GSAP is stable, slow-moving ecosystem)
