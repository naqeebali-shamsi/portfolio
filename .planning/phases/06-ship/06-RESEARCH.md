# Phase 6: Ship - Research

**Researched:** 2026-03-20
**Domain:** Mobile responsiveness, performance optimization, SEO, deployment readiness
**Confidence:** HIGH

## Summary

Phase 6 turns the completed portfolio into a shippable product: mobile responsive layout, performance budget compliance, SEO markup, and Vercel deployment documentation. The project is a Vite 7 + React 19 SPA with Tailwind 4, GSAP, and lazy-loaded R3F for the hero section.

The current production build shows an initial bundle of ~124KB gzipped (115KB JS + 8KB CSS), already well under the 200KB target. The 3D HeroScene is correctly lazy-loaded (261KB gzipped, excluded from budget). Key optimizations available: font subsetting (switch to latin-only imports saves ~70KB of unnecessary woff2 files from being referenced), and removing unused framer-motion dependency from package.json.

**Primary recommendation:** Focus effort on mobile responsive layout (the most labor-intensive task), then SEO markup (mechanical but important), font optimization (easy win), and finally deployment documentation (minimal since it is localhost-only).

## Standard Stack

### Core (Already in Project)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Vite | 7.3.1 | Build tool, code splitting | Configured |
| Tailwind CSS | 4.1.18 | Responsive utilities, breakpoints | Configured |
| GSAP | 3.14.2 | Animations (incl. matchMedia for responsive) | Configured |
| React | 19.2.0 | UI framework | Configured |
| Fontsource (Inter, Space Grotesk) | latest | Self-hosted fonts | Configured |

### New for This Phase
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| satori | latest | OG image generation at build time | Converts JSX to SVG, no headless browser needed |
| @resvg/resvg-js | latest | SVG-to-PNG conversion | Pairs with satori for PNG output |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| satori + resvg-js | puppeteer (already installed) | Puppeteer works but is 10x slower, heavier; satori is purpose-built for this |
| satori + resvg-js | Static PNG file | Manual, no auto-generation; acceptable since user said placeholder images for now |

**Recommendation on OG image:** Given the user said "placeholder images for now," a simple static OG image placeholder is acceptable. A satori-based build script is the premium approach but can be deferred. If implementing now, satori + resvg-js is the right stack (no headless browser overhead). Puppeteer is already in devDependencies and could also work.

**Installation (if using satori):**
```bash
npm install -D satori @resvg/resvg-js
```

## Architecture Patterns

### Responsive Breakpoint Configuration (Tailwind 4)

The user decided on three breakpoints: 640px (mobile), 1024px (tablet), 1280px (desktop). Tailwind 4 defaults are sm:640px, md:768px, lg:1024px, xl:1280px. The user's breakpoints map to `sm`, `lg`, and `xl` in Tailwind defaults.

**Decision:** Use Tailwind's default breakpoints directly. `sm:` = 640px, `lg:` = 1024px, `xl:` = 1280px. No custom breakpoint configuration needed.

```css
/* No changes needed in theme.css -- defaults match */
/* sm: 640px = mobile breakpoint */
/* lg: 1024px = tablet breakpoint */
/* xl: 1280px = desktop breakpoint */
```

**Pattern:** Mobile-first approach. Unprefixed = mobile, `sm:` = larger mobile, `lg:` = tablet, `xl:` = desktop.

### Responsive Layout Pattern

```
Mobile (< 640px):
  - Single column layouts
  - Hero: text-only (no 3D, no CSS fallback)
  - Reduced spacing/padding
  - Touch-friendly tap targets (min 44x44px)
  - Font size scale down

Tablet (640px - 1023px):
  - Two-column where appropriate
  - Hero: text-only (3D hidden until lg:)
  - Medium spacing

Desktop (1024px+):
  - Full layout with 3D hero (already implemented)
  - Max-width container (87.5rem / 1400px)
  - Full spacing
```

### GSAP Responsive Animations with matchMedia

The project already uses `gsap.matchMedia()` in the Hero component. This is the correct pattern for responsive animation differences.

```typescript
// Source: existing codebase pattern
const mm = gsap.matchMedia();

mm.add('(min-width: 1024px)', () => {
  // Desktop-only animations
});

mm.add('(max-width: 1023px)', () => {
  // Mobile/tablet: simpler or no animations
});
```

### Hero Mobile Adaptation

The current Hero component already hides the 3D visual on mobile:
```tsx
<div className="flex-1 w-full hidden lg:flex items-center justify-center">
  {/* 3D only shows on lg+ */}
</div>
```

This matches the user decision: "Text-only hero on mobile -- no 3D, no CSS fallback visual element." The `hidden lg:flex` already handles this. Mobile will show only HeroText.

### SEO Markup Structure

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Optimized title]</title>
  <meta name="description" content="[Compelling meta description]" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="[Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="https://naqeebali.me/og-image.png" />
  <meta property="og:url" content="https://naqeebali.me" />
  <meta property="og:site_name" content="Naqeebali Shamsi" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Title]" />
  <meta name="twitter:description" content="[Description]" />
  <meta name="twitter:image" content="https://naqeebali.me/og-image.png" />

  <!-- JSON-LD Person Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://naqeebali.me/#person",
    "name": "Naqeebali Shamsi",
    "url": "https://naqeebali.me",
    "jobTitle": ["Cloud Developer", "Solution Architect", "Full Stack Developer"],
    "description": "[Brief professional description]",
    "sameAs": [
      "https://github.com/[username]",
      "https://linkedin.com/in/[username]"
    ]
  }
  </script>

  <!-- Canonical -->
  <link rel="canonical" href="https://naqeebali.me" />
</head>
```

### Anti-Patterns to Avoid
- **Adding responsive classes after the fact without mobile-first thinking:** Always start with the mobile layout (unprefixed), then add `lg:` and `xl:` overrides.
- **Using px for breakpoints in Tailwind 4 @theme:** Tailwind 4 breakpoints use `rem` by default.
- **Lighthouse testing in dev mode:** Always test production builds. Dev mode includes HMR, source maps, and unminified code.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive breakpoint system | Custom media queries | Tailwind's built-in responsive prefixes (`sm:`, `lg:`, `xl:`) | Consistent, composable, tested |
| OG image generation | Custom canvas/image manipulation | satori + @resvg/resvg-js OR static placeholder | Edge cases in text rendering, font loading |
| JSON-LD schema | Manual JSON string construction | Static script tag in index.html | SPA with single page, no dynamic schema needed |
| Font loading optimization | Custom font preload logic | Fontsource latin-only imports + `font-display: swap` (already set) | Fontsource handles unicode-range, format fallbacks |
| Touch target sizing | Manual pixel calculations | Tailwind's `min-h-11 min-w-11` (44px) | Accessibility standard, easy to audit |
| Device capability detection | New detection logic | Existing `useDeviceCapability` hook | Already built, handles 3D fallback |

## Common Pitfalls

### Pitfall 1: Font Subset Bloat
**What goes wrong:** Fontsource imports like `@fontsource/inter/400.css` include ALL unicode subsets (cyrillic, greek, vietnamese, latin-ext). The browser only downloads what it needs via unicode-range, but all font files are referenced and built into the dist.
**Why it happens:** Default imports include all subsets for maximum language support.
**How to avoid:** Use subset-specific imports: `@fontsource/inter/latin-400.css` and `@fontsource/space-grotesk/latin-700.css`. This removes ~70KB of woff2 files from the build output.
**Warning signs:** Multiple woff2 files for cyrillic, greek, vietnamese in dist/assets/.

### Pitfall 2: Unused Dependencies Inflating Bundle
**What goes wrong:** framer-motion is in package.json but only used by two unused components (neon-flow.tsx, timeline.tsx which are not imported in App.tsx). While tree-shaking should exclude it from the bundle, the dependency remains and confuses future developers.
**Why it happens:** Leftover from earlier development phases.
**How to avoid:** Remove framer-motion from package.json. Also remove lodash if truly unused (confirmed: no imports found).
**Warning signs:** `npm ls framer-motion` shows it installed but `grep` finds no active imports.

### Pitfall 3: CLS from Font Loading
**What goes wrong:** Cumulative Layout Shift when custom fonts load and text reflows.
**Why it happens:** System font fallback has different metrics than Inter/Space Grotesk.
**How to avoid:** Fontsource already uses `font-display: swap`. Additionally, consider using `size-adjust` on the fallback font to match metrics. For Space Grotesk headings (uppercase, letter-spaced), CLS impact is minimal since headings typically have fixed height containers.
**Warning signs:** Lighthouse CLS score > 0.1.

### Pitfall 4: Touch Targets Too Small
**What goes wrong:** Interactive elements smaller than 44x44px fail Lighthouse accessibility audit.
**Why it happens:** Desktop-optimized links and buttons don't account for finger tap area.
**How to avoid:** Audit all interactive elements on mobile. Apply minimum `min-h-11` (44px) and adequate padding. Navbar links, social links, and CTA buttons are common offenders.
**Warning signs:** Lighthouse flags "Tap targets are not sized appropriately."

### Pitfall 5: Missing Semantic HTML
**What goes wrong:** Lighthouse SEO/Accessibility scores drop due to missing landmarks, headings hierarchy, or alt text.
**Why it happens:** Div-heavy React components without semantic elements.
**How to avoid:** Ensure `<main>`, `<nav>`, `<section>`, `<footer>` are used. Verify heading hierarchy (single h1, logical h2/h3 flow). Add alt text to all images. Use `<button>` for interactive elements, not styled divs.
**Warning signs:** Lighthouse flags "Document does not have a main landmark" or "Heading elements are not in sequentially-descending order."

### Pitfall 6: Lighthouse Testing a Dev Server
**What goes wrong:** Scores are 20-40 points lower than production due to unminified code, HMR overhead.
**Why it happens:** Testing `localhost:5173` (dev) instead of `localhost:4173` (preview of production build).
**How to avoid:** Always run `vite build && vite preview`, then test on localhost:4173.
**Warning signs:** Performance score below 60 despite small bundle.

## Code Examples

### Font Optimization (Latin-Only Imports)
```typescript
// src/main.tsx - BEFORE (all subsets)
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'

// src/main.tsx - AFTER (latin only)
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/inter/latin-400.css'
```

### Tailwind 4 Mobile-First Responsive Pattern
```tsx
// Example: Section padding that scales with breakpoints
<section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:px-12">
  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading">
    Section Title
  </h2>
</section>
```

### GSAP matchMedia for Responsive Animations
```typescript
// Disable or simplify scroll animations on mobile
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    // Full desktop animations
    gsap.from('.animate-item', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: { trigger: '.section', start: 'top 80%' }
    });
  });

  mm.add('(max-width: 1023px)', () => {
    // Simpler mobile animations (or none)
    gsap.from('.animate-item', {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: { trigger: '.section', start: 'top 90%' }
    });
  });
}, { scope: containerRef });
```

### OG Image Build Script (Satori Approach)
```javascript
// scripts/generate-og.mjs
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';

const fontData = readFileSync('./node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff');

const svg = await satori(
  {
    type: 'div',
    props: {
      style: {
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '80px',
        backgroundColor: '#FAFAF5', color: '#32292F',
        fontFamily: 'Space Grotesk',
      },
      children: [
        { type: 'div', props: { children: 'NAQEEBALI SHAMSI', style: { fontSize: 64, fontWeight: 700, letterSpacing: '0.05em' } } },
        { type: 'div', props: { children: 'Full Stack Developer | Cloud Architect', style: { fontSize: 32, color: '#705D56', marginTop: 16 } } },
      ],
    },
  },
  { width: 1200, height: 630, fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700 }] }
);

const resvg = new Resvg(svg);
const png = resvg.render().asPng();
writeFileSync('./public/og-image.png', png);
console.log('OG image generated: public/og-image.png');
```

### JSON-LD Person Schema (Recommended Depth)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://naqeebali.me/#person",
  "name": "Naqeebali Shamsi",
  "url": "https://naqeebali.me",
  "jobTitle": "Full Stack Developer",
  "knowsAbout": ["React", "Node.js", "Cloud Architecture", "TypeScript"],
  "sameAs": [
    "https://github.com/naqeebali-shamsi",
    "https://linkedin.com/in/naqeebali-shamsi"
  ]
}
```

### Vercel Configuration (for documentation)
```json
// vercel.json (document, don't deploy)
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN | Fontsource self-hosted woff2 | Ongoing | Eliminates third-party request, privacy, GDPR |
| `@fontsource/inter/400.css` (all subsets) | `@fontsource/inter/latin-400.css` | Available now | Removes ~70KB unnecessary font files from build |
| framer-motion for animations | GSAP only | Project decision | ~30KB savings, already implemented |
| Puppeteer for OG images | satori + resvg-js | 2023+ | 10x faster, no headless browser, lighter |
| tailwind.config.js | Tailwind 4 @theme in CSS | Tailwind 4 | No JS config file, CSS-native |

## Performance Budget Analysis

**Current production build (measured):**

| Asset | Raw | Gzipped | Category |
|-------|-----|---------|----------|
| index.js (main bundle) | 337KB | 115.7KB | Initial load |
| index.css | 42KB | 7.9KB | Initial load |
| **Initial total** | **379KB** | **123.6KB** | **Under 200KB target** |
| HeroScene.js (lazy) | 952KB | 261KB | Excluded from budget |

**Font files loaded (current - all subsets referenced):**
- Inter latin: 23.6KB (the only one browsers actually download for English)
- Space Grotesk latin: 12.8KB
- Total font download: ~36KB (browsers use unicode-range to skip non-latin)

**After font subsetting optimization:**
- Build output removes ~70KB of unused woff2 files (cyrillic, greek, vietnamese)
- No change to actual page load (browsers already skip them), but cleaner build

**Verdict:** The 200KB gzipped target is already met at ~124KB. Font optimization is good hygiene but won't change the user-visible metric since unicode-range already prevents unnecessary downloads.

**Potential further optimizations if needed:**
1. Remove framer-motion from package.json (doesn't affect bundle since tree-shaken, but cleaner)
2. Remove lodash from package.json (no imports found)
3. Manual chunks in vite.config.ts to split React/GSAP/Three.js vendors for better caching:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-gsap': ['gsap', '@gsap/react'],
      }
    }
  }
}
```

## Open Questions

1. **Exact social media profile URLs for sameAs**
   - What we know: User is Naqeebali Shamsi, has GitHub and likely LinkedIn
   - What's unclear: Exact profile URLs for JSON-LD sameAs array
   - Recommendation: Use placeholder URLs, user fills in during review

2. **OG image: generate or placeholder?**
   - What we know: User said "placeholder images for now"
   - What's unclear: Whether to implement satori pipeline now or just create a static PNG
   - Recommendation: Create a simple static placeholder OG image (1200x630 PNG) with name + title. Document the satori build script approach for when they want auto-generation later.

3. **Case study mobile layout specifics**
   - What we know: Claude's discretion, device frames and architecture diagrams need mobile treatment
   - What's unclear: Exact layout decisions (stack vs. hide vs. simplify)
   - Recommendation: Stack vertically on mobile, hide device frames below sm:, show simplified architecture diagram

4. **Custom cursor behavior on mobile**
   - What we know: CustomCursor component exists, is active on all viewports
   - What's unclear: Whether it should be disabled on touch devices
   - Recommendation: Disable custom cursor on touch devices (no hover state on mobile). The existing `.custom-cursor-active` class suggests this may already be handled.

## Sources

### Primary (HIGH confidence)
- Project codebase analysis: package.json, vite.config.ts, App.tsx, Hero.tsx, main.tsx, theme.css
- Production build output: `vite build` actual gzip sizes measured
- Tailwind CSS 4 official docs (https://tailwindcss.com/docs/screens) - breakpoint customization syntax
- Schema.org Person type (https://schema.org/Person) - JSON-LD properties

### Secondary (MEDIUM confidence)
- Fontsource package structure: confirmed latin-only imports available via node_modules inspection
- Satori GitHub (https://github.com/vercel/satori) - OG image generation approach
- Blunar.cz mobile analysis via WebFetch - responsive patterns reference

### Tertiary (LOW confidence)
- WebSearch results on Lighthouse scoring best practices - general guidance, not project-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - directly measured from project build output
- Architecture (responsive): HIGH - Tailwind 4 docs verified, existing codebase patterns confirmed
- Performance budget: HIGH - actual build sizes measured
- SEO markup: HIGH - JSON-LD and OG standards are stable, well-documented
- OG image generation: MEDIUM - satori approach verified but implementation details may vary
- Pitfalls: HIGH - directly observed in codebase (font imports, unused deps)

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable domain, no fast-moving dependencies)
