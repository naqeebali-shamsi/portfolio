# Phase 1: Design System - Research

**Researched:** 2026-03-18
**Domain:** Typography, Color Tokens, Spacing Tokens, Navigation (Tailwind CSS 4, React 19, Vite 7)
**Confidence:** HIGH

## Summary

This phase establishes the visual language for the portfolio site: typography (Space Grotesk headings, Inter body), a locked light color palette, 8px-base spacing tokens, and a scroll-aware navigation bar. The entire design system maps onto Tailwind CSS 4's new CSS-first `@theme` directive, which replaces `tailwind.config.js` with in-CSS design token declarations.

The existing codebase has a dark "matrix" theme with multiple theme variants, different fonts (Outfit, JetBrains Mono, Sora, etc.), and a theme-switching navbar. All of this must be stripped out and replaced with the single light theme and new typography. The `tailwind.config.js` file becomes obsolete under Tailwind 4's `@theme` approach -- all tokens go in CSS.

**Primary recommendation:** Define all design tokens (colors, fonts, spacing, typography scale) in a single `@theme` block in the main CSS file. Self-host fonts via Fontsource for performance. Build the nav as a standalone component with a `useScrollDirection` hook.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | 4.1.x | Utility CSS framework | Already installed, @theme directive for design tokens |
| @fontsource/space-grotesk | latest | Heading font (self-hosted) | Eliminates Google Fonts CDN latency (~300ms savings) |
| @fontsource/inter | latest | Body font (self-hosted) | Same CDN elimination benefit, version-locked |
| clsx | 2.1.x | Conditional classnames | Already installed |
| tailwind-merge | 3.5.x | Merge Tailwind classes | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/space-grotesk | latest | Variable font variant | If variable font axis control is desired (weight range) |
| @fontsource-variable/inter | latest | Variable font variant | Single file for all weights, smaller total bundle |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Fontsource (self-host) | Google Fonts CDN | CDN adds ~300ms latency from DNS+TCP; self-hosting bundles fonts with app, no external dependency |
| @fontsource static | @fontsource-variable | Variable fonts are single files with all weights but slightly larger per-file; static allows cherry-picking exact weights for smallest bundle |

**Installation:**
```bash
npm install @fontsource/space-grotesk @fontsource/inter
```

Or for variable fonts (recommended -- fewer HTTP requests, flexible weight control):
```bash
npm install @fontsource-variable/space-grotesk @fontsource-variable/inter
```

**Uninstall (remove old fonts and unused deps):**
```bash
# Remove Google Fonts link tags from index.html (currently loads 7 font families)
# Remove framer-motion (decision: GSAP only, done in Phase 4)
# Remove ThemeContext and theme-switching logic
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  styles/
    theme.css          # @theme tokens: colors, fonts, spacing, typography scale
    base.css           # @layer base: resets, global styles, font-face imports
    index.css          # Imports theme.css + base.css (entry point)
  components/
    Navbar/
      Navbar.tsx       # Navigation component
      Navbar.module.css # (if needed beyond Tailwind)
  hooks/
    useScrollDirection.ts  # Scroll direction detection for nav hide/show
```

### Pattern 1: Tailwind CSS 4 @theme Design Tokens

**What:** All design tokens declared in a single `@theme` block in CSS. No `tailwind.config.js` needed for theme customization.

**When to use:** Always in Tailwind 4 projects. This is the canonical approach.

**Example:**
```css
/* src/styles/theme.css */
@import "tailwindcss";

@theme {
  /* ---- Colors ---- */
  --color-*: initial; /* Remove ALL default colors */

  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-transparent: transparent;

  /* Brand palette */
  --color-bg: #FAFAF5;
  --color-bg-feature: #F0F7F4;
  --color-text: #32292F;
  --color-text-muted: #705D56;
  --color-accent: #70ABAF;
  --color-accent-light: #99E1D9;

  /* ---- Typography ---- */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Font sizes with line-height */
  --text-body: 1.125rem;
  --text-body--line-height: 1.75;

  --text-sm: 0.875rem;
  --text-sm--line-height: 1.5;

  --text-lg: 1.25rem;
  --text-lg--line-height: 1.6;

  --text-xl: 1.5rem;
  --text-xl--line-height: 1.4;

  --text-2xl: 2rem;
  --text-2xl--line-height: 1.3;

  --text-3xl: 2.5rem;
  --text-3xl--line-height: 1.2;

  --text-4xl: 3rem;
  --text-4xl--line-height: 1.15;

  --text-5xl: 4rem;
  --text-5xl--line-height: 1.1;

  --text-6xl: 5rem;
  --text-6xl--line-height: 1.05;

  --text-display: clamp(4rem, 8vw, 8rem);
  --text-display--line-height: 0.95;
  --text-display--letter-spacing: 0.05em;

  /* Letter spacing tokens */
  --tracking-heading: 0.05em;
  --tracking-heading-wide: 0.1em;

  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* ---- Spacing ---- */
  --spacing: 0.25rem; /* Base: 4px. Tailwind multiplies: p-2 = 0.5rem, p-4 = 1rem, etc. */

  /* Named spacing tokens for semantic use */
  --spacing-section: clamp(5rem, 8vw, 6.25rem); /* 80-100px section padding */
  --spacing-container: 87.5rem; /* 1400px max-width */

  /* ---- Border Radius ---- */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* ---- Transitions ---- */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Source:** [Tailwind CSS Theme Variables docs](https://tailwindcss.com/docs/theme), [Tailwind CSS Customizing Colors](https://tailwindcss.com/docs/customizing-colors)

### Pattern 2: Font Loading with Fontsource

**What:** Self-hosted fonts imported as npm packages. Bundled by Vite, no external CDN requests.

**When to use:** Always for production sites prioritizing performance.

**Example:**
```typescript
// src/styles/base.css or src/main.tsx
import '@fontsource/space-grotesk/700.css'; // Only Bold for headings
import '@fontsource/inter/400.css';         // Regular for body
import '@fontsource/inter/500.css';         // Medium for UI elements (optional)
```

Fontsource CSS files include `@font-face` declarations with `font-display: swap` by default.

**Source:** [Fontsource Space Grotesk Install](https://fontsource.org/fonts/space-grotesk/install), [Fontsource Inter Install](https://fontsource.org/fonts/inter/install)

### Pattern 3: Scroll-Aware Navigation Hook

**What:** Custom React hook tracking scroll direction to hide/show nav.

**When to use:** For the nav that hides on scroll-down, reveals on scroll-up.

**Example:**
```typescript
// src/hooks/useScrollDirection.ts
import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateDirection = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY < threshold);

      if (Math.abs(scrollY - lastScrollY.current) < threshold) {
        ticking.current = false;
        return;
      }

      setDirection(scrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, isAtTop };
}
```

**Source:** Community pattern, verified across multiple React implementations.

### Anti-Patterns to Avoid
- **Using tailwind.config.js for theme in Tailwind 4:** The JS config file is legacy. Use `@theme` in CSS. The existing `tailwind.config.js` in the codebase should be deleted after migrating tokens.
- **Loading all Google Font weights via CDN:** The current `index.html` loads 7 font families with many weights. This is extremely heavy. Replace with Fontsource importing only needed weights.
- **CSS custom properties in :root for design tokens:** Use `@theme` instead. `:root` vars do NOT generate Tailwind utility classes. Only use `:root` for non-utility variables.
- **Multiple theme support when only one theme is needed:** The existing ThemeContext with 5 themes is unnecessary overhead. Remove entirely.
- **Scroll event listener without requestAnimationFrame:** Raw scroll listeners fire on every pixel, causing layout thrashing. Always debounce via rAF.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font hosting/loading | Manual @font-face declarations | Fontsource npm packages | Handles font-display, subsetting, file paths, cross-browser compat |
| Design tokens | CSS custom properties scattered across files | Tailwind @theme single block | Generates utility classes automatically, single source of truth |
| Class merging | String concatenation for conditional classes | clsx + tailwind-merge | Handles conflicts (e.g., `bg-red bg-blue` resolves correctly) |
| Scroll direction detection | Inline scroll listener in component | Custom `useScrollDirection` hook | Reusable, rAF-optimized, testable, avoids re-render storms |

**Key insight:** Tailwind 4's `@theme` IS the design token system. There is no need for a separate token file, design-token library, or CSS variable management approach. Put tokens in `@theme`, use the generated utility classes everywhere.

## Common Pitfalls

### Pitfall 1: Tailwind 4 Config Confusion
**What goes wrong:** Mixing `tailwind.config.js` theme extensions with `@theme` CSS declarations. They can conflict or cause tokens to be defined twice.
**Why it happens:** Codebase has a legacy `tailwind.config.js` file from v3 era.
**How to avoid:** Delete `tailwind.config.js` entirely. Move all token definitions to `@theme` in CSS. Tailwind 4 with `@tailwindcss/vite` plugin does not require a JS config file.
**Warning signs:** Duplicate color names, utilities not working, config values ignored.

### Pitfall 2: Font Flash (FOUT) vs Invisible Text (FOIT)
**What goes wrong:** Text is invisible while fonts load, or there's a jarring flash when fonts swap in.
**Why it happens:** Missing `font-display: swap` or loading too many font weights.
**How to avoid:** Fontsource includes `font-display: swap` by default. Only import weights actually used (700 for Space Grotesk, 400 for Inter). Remove ALL Google Fonts `<link>` tags from `index.html`.
**Warning signs:** Blank text on slow connections, large font downloads in network tab.

### Pitfall 3: Color Namespace Reset Without Essentials
**What goes wrong:** Using `--color-*: initial` removes ALL colors including white, black, transparent. Then `bg-white`, `text-black`, `bg-transparent` stop working.
**Why it happens:** The initial reset is absolute -- it removes everything.
**How to avoid:** After `--color-*: initial`, explicitly re-declare `--color-white`, `--color-black`, `--color-transparent`, and `--color-current`.
**Warning signs:** Utility classes producing no CSS output, missing colors in dev tools.

### Pitfall 4: Section Padding Not Responsive
**What goes wrong:** Fixed padding values (e.g., `py-24`) look great on desktop but crush mobile layouts.
**Why it happens:** Using fixed spacing instead of responsive or fluid values.
**How to avoid:** Use `clamp()` for section padding tokens. E.g., `--spacing-section: clamp(5rem, 8vw, 6.25rem)`. Tailwind 4 supports clamp in @theme.
**Warning signs:** Sections feel cramped on mobile, text touching edges.

### Pitfall 5: Nav Z-Index Wars
**What goes wrong:** Nav renders behind hero 3D canvas, modals, or other positioned elements.
**Why it happens:** Missing or insufficient z-index on fixed/sticky nav.
**How to avoid:** Set nav to `fixed` with `z-50` (z-index: 50). Keep a z-index scale documented.
**Warning signs:** Nav disappearing behind content on scroll.

### Pitfall 6: Removing Old Theme Without Breaking Current Components
**What goes wrong:** Stripping ThemeContext, CSS variables, and theme classes breaks all existing components that reference `var(--bg-primary)`, `var(--text-primary)`, etc.
**Why it happens:** Existing code deeply references the old CSS variable names.
**How to avoid:** Map new token names to the places old variables were used. Either do a find-replace across the codebase OR keep temporary CSS variable aliases during migration. Since this is a redesign, a clean replacement is better.
**Warning signs:** Blank/unstyled pages, missing colors, broken layouts.

## Code Examples

### Complete @theme Design Token File
```css
/* src/styles/theme.css */
@import "tailwindcss";

@theme {
  /* Reset defaults we don't need */
  --color-*: initial;

  /* Base colors */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-transparent: transparent;
  --color-current: currentColor;

  /* Brand palette */
  --color-bg: #FAFAF5;
  --color-bg-feature: #F0F7F4;
  --color-bg-dark: #32292F;
  --color-text: #32292F;
  --color-text-muted: #705D56;
  --color-accent: #70ABAF;
  --color-accent-light: #99E1D9;

  /* Fonts */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Type scale */
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.5;
  --text-base: 1.125rem;
  --text-base--line-height: 1.75;
  --text-lg: 1.25rem;
  --text-lg--line-height: 1.6;
  --text-xl: 1.5rem;
  --text-xl--line-height: 1.4;
  --text-2xl: 2rem;
  --text-2xl--line-height: 1.3;
  --text-3xl: 3rem;
  --text-3xl--line-height: 1.2;
  --text-4xl: 4rem;
  --text-4xl--line-height: 1.1;
  --text-5xl: 5rem;
  --text-5xl--line-height: 1.05;
  --text-display: clamp(4rem, 8vw, 8rem);
  --text-display--line-height: 0.95;
  --text-display--letter-spacing: 0.05em;
  --text-display--font-weight: 700;

  /* Tracking */
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
  --tracking-heading: 0.05em;
  --tracking-wide: 0.1em;

  /* Spacing base */
  --spacing: 0.25rem;

  /* Named spacing */
  --spacing-section: clamp(5rem, 8vw, 6.25rem);
  --spacing-container: 87.5rem;

  /* Easing */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Usage in components:
```tsx
{/* Heading */}
<h1 className="font-heading text-display uppercase tracking-heading font-bold text-text">
  NAQEEBALI SHAMSI
</h1>

{/* Body text */}
<p className="font-body text-base text-text-muted">
  Full stack engineer building premium experiences.
</p>

{/* Section wrapper */}
<section className="py-section px-8 max-w-container mx-auto">
  {/* content */}
</section>

{/* Feature section with alternate bg */}
<section className="bg-bg-feature py-section px-8">
  {/* content */}
</section>
```

### Font Import Pattern
```typescript
// src/main.tsx
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import './styles/theme.css';
import './styles/base.css';
```

### Base Styles
```css
/* src/styles/base.css */
@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--text-base--line-height);
    color: var(--color-text);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ::selection {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
}
```

### Navbar Component Pattern
```tsx
// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { label: 'How I Build', href: '#how-i-build' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { direction, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHidden = direction === 'down' && !isAtTop && !mobileOpen;

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out',
          isHidden && '-translate-y-full',
          !isAtTop && 'bg-bg/80 backdrop-blur-md border-b border-accent-light/20',
        )}
      >
        <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Name/Initials */}
          <a href="#" className="font-heading text-lg font-bold tracking-heading text-text">
            NS
          </a>

          {/* Right: Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden relative w-6 h-5 flex flex-col justify-between"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={clsx('h-0.5 w-full bg-text transition-transform', mobileOpen && 'rotate-45 translate-y-2')} />
            <span className={clsx('h-0.5 w-full bg-text transition-opacity', mobileOpen && 'opacity-0')} />
            <span className={clsx('h-0.5 w-full bg-text transition-transform', mobileOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-4xl font-bold uppercase tracking-heading text-text hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` theme object | `@theme` CSS directive | Tailwind CSS 4.0 (Jan 2025) | All tokens in CSS, no JS config needed |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind CSS 4.0 (Jan 2025) | Single import replaces three directives |
| Google Fonts CDN `<link>` tags | Fontsource npm packages | Fontsource stable since 2022 | Self-hosted, version-locked, ~300ms faster |
| `purge` / `content` in config | Automatic content detection | Tailwind CSS 4.0 (Jan 2025) | No `content` array needed in most setups |
| `theme.extend.colors` in JS | `--color-*` in `@theme` | Tailwind CSS 4.0 (Jan 2025) | Colors generate utilities AND CSS variables |

**Deprecated/outdated:**
- `tailwind.config.js` theme customization: Still works for backwards compat but `@theme` is canonical
- `@tailwind base; @tailwind components; @tailwind utilities;`: Replaced by `@import "tailwindcss"`
- `content` array in config: Tailwind 4 auto-detects with `@tailwindcss/vite` plugin
- Google Fonts CDN links: Inferior to self-hosting for performance-focused sites

## Open Questions

1. **Variable fonts vs static fonts for bundle size**
   - What we know: Variable fonts use a single file per font family; static fonts allow cherry-picking individual weights
   - What's unclear: Whether Space Grotesk variable (which includes weights 300-700) is smaller than a single static 700 weight file
   - Recommendation: Start with static `@fontsource/space-grotesk/700.css` and `@fontsource/inter/400.css` for minimal bundle. Can switch to variable later if more weights needed.

2. **Existing component migration scope**
   - What we know: All existing components (Hero, Projects, About, etc.) reference old CSS variables (`var(--bg-primary)`, `var(--text-primary)`, etc.) and old fonts
   - What's unclear: Whether to clean up all components now or leave them broken until their respective phase
   - Recommendation: Set up new tokens and base styles. Create a thin CSS compatibility layer mapping old variable names to new values temporarily, so the app doesn't completely break. Each phase will properly rewrite its components.

3. **Nav name format**
   - What we know: Context says Claude's discretion whether "NS" initials or "Naqeebali Shamsi"
   - Recommendation: Use "NS" -- cleaner, more minimal, fits the design philosophy. Full name appears in the hero section.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Theme Variables docs](https://tailwindcss.com/docs/theme) -- @theme syntax, namespaces, initial reset
- [Tailwind CSS Customizing Colors](https://tailwindcss.com/docs/customizing-colors) -- color token patterns
- [Fontsource Space Grotesk](https://fontsource.org/fonts/space-grotesk/install) -- installation, import patterns
- [Fontsource Inter](https://fontsource.org/fonts/inter/install) -- installation, import patterns
- [Tailwind CSS font-size docs](https://tailwindcss.com/docs/font-size) -- --text-* namespace with --line-height suffix

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- migration patterns, new features
- [Fontsource GitHub](https://github.com/fontsource/fontsource) -- font-display: swap default behavior

### Tertiary (LOW confidence)
- Community scroll-direction hook patterns -- verified across multiple implementations but no single authoritative source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Tailwind 4 @theme is well-documented, Fontsource is established
- Architecture: HIGH -- @theme pattern is canonical per official docs, font loading is straightforward
- Pitfalls: HIGH -- Config confusion and color reset are well-documented issues
- Navigation: MEDIUM -- Scroll-direction pattern is community standard but implementation details vary

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable technologies, 30-day validity)
