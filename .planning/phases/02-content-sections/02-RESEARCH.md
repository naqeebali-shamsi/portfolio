# Phase 2: Content Sections - Research

**Researched:** 2026-03-18
**Domain:** React content sections with Tailwind 4, CSS device frames, Clipboard API
**Confidence:** HIGH

## Summary

This phase builds four content sections (How I Build, NomadCrew Case Study, Experience Timeline, Contact) using React + TypeScript + Tailwind 4. The existing codebase has placeholder sections in `App.tsx` with the correct section IDs and layout patterns already established. The design system from Phase 1 provides all necessary tokens (typography scale, spacing, colors).

The existing legacy components (`social-icons.tsx`, `timeline.tsx`) use dark theme styling and Framer Motion -- both incompatible with the current light-theme, GSAP-only constraints. They should be rebuilt from scratch using the established design tokens, with the SVG icon markup from `social-icons.tsx` being the one piece worth extracting.

**Primary recommendation:** Build each section as a standalone React component in `src/sections/`, import real data from a new TypeScript data file, use pure CSS for phone device frames, and use the native Clipboard API for click-to-copy. No new dependencies needed.

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | Component framework | Already in project |
| TypeScript | 5.9.3 | Type safety | Already in project |
| Tailwind CSS | 4.1.18 | Utility-first styling | Already in project, @theme tokens set up |
| clsx | 2.1.1 | Conditional class names | Already in project |
| tailwind-merge | 3.5.0 | Class merging | Already in project |
| lucide-react | 0.563.0 | Icons | Already in project, can use for misc icons |

### No New Dependencies Needed

All four sections can be built with existing dependencies. Specifically:
- **Phone mockups:** Pure CSS (no library needed)
- **Clipboard:** Native `navigator.clipboard.writeText()` API (no library needed)
- **Timeline:** Custom CSS with Tailwind utilities (no library needed)
- **Social icons:** SVG inline icons (already have SVG markup in legacy `social-icons.tsx`)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom CSS phone frame | devices.css library | Adds dependency for one component; CSS is ~50 lines |
| Native Clipboard API | react-copy-to-clipboard | Unnecessary wrapper; native API is 3 lines of code |
| Custom timeline CSS | Legacy timeline.tsx | Legacy uses Framer Motion (banned) + dark theme styling |

## Architecture Patterns

### Recommended Project Structure
```
src/
├── sections/
│   ├── HowIBuild.tsx        # Manifesto-style philosophy statements
│   ├── CaseStudy.tsx         # NomadCrew full-width breakout case study
│   ├── Experience.tsx        # Timeline + education sub-section
│   └── Contact.tsx           # Full-viewport footer with click-to-copy
├── components/
│   ├── DeviceFrame.tsx       # Reusable phone mockup wrapper
│   └── SocialLinks.tsx       # Icon row (rebuilt for light theme)
├── data/
│   └── content.ts            # All section content as typed constants
└── hooks/
    └── useCopyToClipboard.ts # Clipboard hook with feedback state
```

### Pattern 1: Section Component Structure
**What:** Each section is a self-contained component that receives no props -- it imports its own data.
**When to use:** All four sections.
**Example:**
```typescript
// Each section follows this structure
import { sectionData } from '@/data/content';

export function HowIBuild() {
  return (
    <section id="how-i-build" className="py-section px-8">
      <div className="max-w-container mx-auto">
        {/* content */}
      </div>
    </section>
  );
}
```

### Pattern 2: Full-Width Breakout (for Case Study)
**What:** Break out of the `max-w-container` parent to go full-width.
**When to use:** NomadCrew case study section needs to feel like "its own world."
**Two approaches:**

**Approach A -- Structural (recommended):** End the container, render full-width, start a new container.
```typescript
export function CaseStudy() {
  return (
    <section id="work" className="py-section">
      {/* Intro content stays in container */}
      <div className="max-w-container mx-auto px-8">
        <h2>...</h2>
        <p>Problem statement...</p>
      </div>

      {/* Full-width breakout area */}
      <div className="w-full bg-bg-feature mt-16 py-16">
        <div className="max-w-container mx-auto px-8">
          {/* Architecture diagram, screenshots in device frames */}
        </div>
      </div>

      {/* Back to container for results */}
      <div className="max-w-container mx-auto px-8 mt-16">
        <p>Outcome...</p>
      </div>
    </section>
  );
}
```

**Approach B -- CSS viewport trick:** Use `w-[100vw] relative left-1/2 -translate-x-1/2` to break out from inside a container. Works but causes horizontal scrollbar issues if not careful.

**Recommendation:** Use Approach A (structural). Cleaner, no scrollbar risk, matches the blunar reference pattern where sections naturally alternate between contained and full-width.

### Pattern 3: Typed Content Data File
**What:** Centralize all section content in a single typed file.
**When to use:** Keeps components clean, makes content easy to update.
```typescript
// src/data/content.ts
export interface Experience {
  company: string;
  role: string;
  years: string;
  oneLiner: string;
}

export interface Education {
  school: string;
  degree: string;
  years: string;
}

export const howIBuildStatements = [
  "Good architecture is a series of bets on the future.",
  "Ship it, measure it, then make it elegant.",
  "Security isn't a feature — it's a foundation.",
] as const;

export const experiences: Experience[] = [
  {
    company: "Propwise",
    role: "Full Stack Engineer",
    years: "2025 – Present",
    oneLiner: "Designing secure financial reporting APIs with PostgreSQL and AWS.",
  },
  // ... etc
];

export const education: Education[] = [
  {
    school: "Dalhousie University",
    degree: "Master of Applied Computer Science",
    years: "2022 – 2023",
  },
  {
    school: "Charotar University",
    degree: "Bachelor of Technology in IT",
    years: "2015 – 2019",
  },
];

export const contactInfo = {
  email: "naqeebali.shamsi@gmail.com",
  socials: {
    github: "https://github.com/naqeebali-shamsi",
    linkedin: "https://www.linkedin.com/in/naqeebali-shamsi/",
    twitter: "https://x.com/naqeebali", // needs actual URL
  },
};
```

### Anti-Patterns to Avoid
- **Importing from legacy `portfolio.js`:** The legacy data file has JS (not TS), includes image imports for unused assets, and has data structures that don't match the new design. Create a fresh `content.ts` instead.
- **Using Framer Motion:** The legacy `timeline.tsx` imports Framer Motion. Decision was GSAP only (Phase 4). Phase 2 has NO animations -- static content only.
- **Dark theme classes:** Legacy components use `bg-neutral-950`, `text-neutral-500`, etc. The new design uses `bg-bg`, `text-text`, `text-text-muted` from the design tokens.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Clipboard copy | Custom fallback logic | `navigator.clipboard.writeText()` | Supported in all modern browsers; project targets modern browsers only |
| SVG social icons | Icon library or font | Inline SVG from legacy `social-icons.tsx` | Already have GitHub, X, LinkedIn SVGs; just need to restyle for light theme |
| Phone device frame | Image-based mockup or SVG | Pure CSS with border-radius + shadows | ~50 lines of CSS, fully responsive, no assets to load |
| Timeline line/dots | Canvas or SVG | CSS pseudo-elements + border | Standard pattern, 20 lines of CSS |

## Common Pitfalls

### Pitfall 1: Full-Width Breakout Causes Horizontal Scrollbar
**What goes wrong:** Using `w-[100vw]` inside a container causes horizontal scrollbar because `100vw` includes scrollbar width.
**Why it happens:** `100vw` = viewport width including scrollbar, but `100%` of the body doesn't include the scrollbar.
**How to avoid:** Use structural breakout (end container, go full-width, restart container) instead of the viewport-width CSS trick. OR use `w-dvw` (dynamic viewport width) which is slightly better but still has edge cases.
**Warning signs:** Horizontal scroll appears on Windows browsers (which have visible scrollbars).

### Pitfall 2: Clipboard API Requires HTTPS
**What goes wrong:** `navigator.clipboard.writeText()` fails silently or throws in HTTP.
**Why it happens:** Clipboard API is only available in secure contexts (HTTPS or localhost).
**How to avoid:** Vite dev server runs on localhost (secure context), and production will be HTTPS. Add a try-catch with user feedback for any failure. No issue in practice.
**Warning signs:** Copy fails in production if deployed to non-HTTPS origin.

### Pitfall 3: Phone Mockup Aspect Ratio Breaks on Mobile
**What goes wrong:** CSS phone frame looks distorted on small screens.
**Why it happens:** Fixed pixel dimensions don't scale with viewport.
**How to avoid:** Use `aspect-ratio` CSS property for the device frame, max-width with percentage-based sizing, and `mx-auto` for centering.

### Pitfall 4: Timeline Vertical Line Alignment
**What goes wrong:** The connecting vertical line doesn't align with dots across breakpoints.
**Why it happens:** Absolute positioning of the line doesn't account for dot size changes.
**How to avoid:** Use a consistent approach: dots are the layout anchor, line is `absolute left-[calc position]` relative to the dot center. Keep dot size constant across breakpoints.

### Pitfall 5: Section ID Anchor Offset by Fixed Navbar
**What goes wrong:** Clicking nav links scrolls to section but content is hidden behind the fixed 64px navbar.
**Why it happens:** Native anchor scroll doesn't account for fixed header.
**How to avoid:** Add `scroll-margin-top: 5rem` (or Tailwind `scroll-mt-20`) to each section element. This is a CSS-only fix.

## Code Examples

### CSS Phone Device Frame
```typescript
// src/components/DeviceFrame.tsx
interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({ children, className }: DeviceFrameProps) {
  return (
    <div className={clsx('relative mx-auto', className)} style={{ maxWidth: '280px' }}>
      {/* Phone bezel */}
      <div className="relative rounded-[2.5rem] border-[8px] border-bg-dark bg-bg-dark p-1 shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-bg-dark rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19.5]">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Click-to-Copy Hook
```typescript
// src/hooks/useCopyToClipboard.ts
import { useState, useCallback } from 'react';

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
      return true;
    } catch {
      console.error('Failed to copy to clipboard');
      return false;
    }
  }, [resetDelay]);

  return { copied, copy };
}
```

### Contact Section with Click-to-Copy
```typescript
// Pattern for the contact email interaction
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

function ContactEmail() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy('naqeebali.shamsi@gmail.com')}
      className="font-heading text-3xl md:text-5xl font-bold tracking-heading
                 text-text hover:text-accent transition-colors cursor-pointer"
    >
      {copied ? 'Copied!' : 'naqeebali.shamsi@gmail.com'}
    </button>
  );
}
```

### Vertical Timeline
```typescript
// Pattern for the experience timeline
interface TimelineEntry {
  company: string;
  role: string;
  years: string;
  oneLiner: string;
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-accent-light/40" />

      <div className="space-y-12">
        {entries.map((entry, i) => (
          <div key={i} className="relative pl-10">
            {/* Dot */}
            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-bg" />

            <p className="font-body text-sm text-text-muted">{entry.years}</p>
            <h3 className="font-heading text-xl font-bold text-text mt-1">
              {entry.company}
            </h3>
            <p className="font-body text-base text-text-muted">{entry.role}</p>
            <p className="font-body text-sm text-text-muted mt-1">{entry.oneLiner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Manifesto-Style Statements (How I Build)
```typescript
// Pattern for bold statement blocks
function HowIBuild() {
  return (
    <section id="how-i-build" className="py-section px-8">
      <div className="max-w-container mx-auto space-y-16 md:space-y-24">
        {howIBuildStatements.map((statement, i) => (
          <p
            key={i}
            className="font-heading text-3xl md:text-4xl lg:text-5xl
                       font-bold leading-tight tracking-tight text-text
                       max-w-4xl"
          >
            {statement}
          </p>
        ))}
      </div>
    </section>
  );
}
```

### Social Links (Rebuilt for Light Theme)
```typescript
// Extract SVGs from legacy social-icons.tsx, restyle for light theme
const SOCIAL_LINKS = [
  { name: 'GitHub', href: '...', icon: <svg>...</svg> },
  { name: 'LinkedIn', href: '...', icon: <svg>...</svg> },
  { name: 'X', href: '...', icon: <svg>...</svg> },
] as const;

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `document.execCommand('copy')` | `navigator.clipboard.writeText()` | Deprecated 2020+ | Use async Clipboard API exclusively |
| Framer Motion for scroll animations | GSAP (per project decision) | Project decision | Legacy timeline.tsx cannot be reused |
| `tailwind.config.js` | Tailwind 4 `@theme` in CSS | Tailwind v4 | All tokens defined in `theme.css`, no config file |
| `100vw` for full-width | `100dvw` or structural breakout | 2023+ (dvw units) | Avoids scrollbar width issues |
| Google Fonts CDN | Fontsource self-hosting | Project decision | `@fontsource/space-grotesk` and `@fontsource/inter` already installed |

**Deprecated/outdated:**
- `document.execCommand('copy')`: Deprecated. Use `navigator.clipboard.writeText()`.
- Framer Motion `useScroll`/`useTransform`: Not allowed per project decision. Legacy timeline uses these.
- `tailwind.config.js`: Not used in Tailwind 4. Tokens are in `src/styles/theme.css`.

## Legacy Component Assessment

### `src/components/ui/social-icons.tsx` -- REBUILD
- **What to keep:** The SVG icon paths for GitHub, X/Twitter, and LinkedIn
- **What to discard:** Everything else (dark theme styling, Dribbble icon, hover animations using state, `bg-neutral-950` container)
- **Action:** Copy the 3 SVG `<path>` elements into a new `SocialLinks.tsx` component styled with design system tokens

### `src/components/ui/timeline.tsx` -- DISCARD, BUILD FRESH
- **Why discard:** Imports `framer-motion` (banned), uses dark theme colors, complex scroll-driven animation that belongs in Phase 4 if at all
- **Action:** Build a simple vertical timeline with CSS-only line and dots using Tailwind utilities

### `src/sections/Contact.tsx` -- DISCARD, BUILD FRESH
- **Why discard:** Uses TerminalText component, has terminal mockup UI, completely different design from the new contact section
- **Action:** New full-viewport contact section with click-to-copy email and social icon row

### `src/assets/data/portfolio.js` -- EXTRACT DATA ONLY
- **What to extract:** `workExperiences` entries (company, role, dates, one-liner), `educationInfo` entries, `socialMediaLinks` URLs, `contactInfo.email_address`
- **Action:** Create new `src/data/content.ts` with typed interfaces pulling real data from this file

## Tailwind 4 Specific Notes

The project uses Tailwind 4 with `@theme` directive. Key utilities available from the existing theme:

| Token | Tailwind Class | Value |
|-------|---------------|-------|
| `--text-display` | `text-display` | `clamp(4rem, 8vw, 8rem)` |
| `--text-5xl` | `text-5xl` | `5rem` |
| `--text-4xl` | `text-4xl` | `4rem` |
| `--text-3xl` | `text-3xl` | `3rem` |
| `--spacing-section` | `py-section` | `clamp(5rem, 8vw, 6.25rem)` |
| `--spacing-container` | `max-w-container` | `87.5rem` (1400px) |
| `--color-bg-feature` | `bg-bg-feature` | `#F0F7F4` (light green tint) |
| `--color-accent` | `text-accent` | `#70ABAF` (teal) |
| `--font-heading` | `font-heading` | Space Grotesk |
| `--font-body` | `font-body` | Inter |

**Important:** The `text-display` token with `clamp(4rem, 8vw, 8rem)` is perfect for the "How I Build" manifesto statements and the contact CTA. The `letter-spacing` and `font-weight` are baked into the token definition with `--text-display--letter-spacing: 0.05em` and `--text-display--font-weight: 700`.

## Open Questions

1. **NomadCrew App Store links**
   - What we know: The context says "App store links/badges alongside screenshots"
   - What's unclear: Are actual App Store/Play Store links available? The data file only has a GitHub repo link.
   - Recommendation: Use placeholder badge images/links that can be swapped in. Consider using official Apple/Google badge SVGs.

2. **NomadCrew screenshots**
   - What we know: Phone mockup screenshots needed in device frames
   - What's unclear: Do actual app screenshots exist? None found in the current codebase assets.
   - Recommendation: Plan for placeholder images initially; note in tasks that real screenshots need to be provided.

3. **Architecture diagram format**
   - What we know: Context calls for "architecture diagram + 3-4 key technical decision bullet points"
   - What's unclear: Should this be an image, SVG, or built with CSS/HTML?
   - Recommendation: Build a simple architecture diagram with CSS grid/flexbox showing the tech stack flow (Go backend -> React Native frontend -> AWS infra). Avoids asset dependency and is maintainable.

4. **Twitter/X URL**
   - What we know: Social links should include Twitter/X
   - What's unclear: No Twitter URL exists in the legacy data file
   - Recommendation: Use a placeholder or ask user for the actual URL during implementation.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/styles/theme.css`, `App.tsx`, `Navbar.tsx` -- verified design tokens and patterns
- Existing codebase: `src/assets/data/portfolio.js` -- real content data for experiences, education, contact
- Existing codebase: `src/components/ui/social-icons.tsx` -- SVG icon paths verified
- MDN Web Docs: Clipboard API `writeText()` -- standard browser API

### Secondary (MEDIUM confidence)
- Tailwind CSS full-width breakout patterns -- multiple sources agree on structural approach
- Pure CSS device mockup techniques -- well-documented pattern from devices.css and community

### Tertiary (LOW confidence)
- None -- all findings verified against existing codebase or standard web APIs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, everything is already installed
- Architecture: HIGH -- patterns verified against existing App.tsx structure and design tokens
- Content data: HIGH -- real data extracted from existing portfolio.js
- Pitfalls: HIGH -- based on well-known CSS/browser issues with documented solutions
- Legacy reuse decisions: HIGH -- code was read and assessed directly

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable -- no fast-moving dependencies)
