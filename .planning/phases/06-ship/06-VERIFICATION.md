---
phase: 06-ship
verified: 2026-03-20T11:00:00Z
status: passed
score: 8/8 must-haves verified
gaps: []
human_verification:
  - test: Run Lighthouse on production preview (node node_modules/vite/bin/vite.js preview)
    expected: All four categories score >= 90 (Performance, Accessibility, Best Practices, SEO)
    why_human: Lighthouse requires a running browser; cannot execute as a static code check
  - test: Open site at 375px viewport width and scroll through all five sections
    expected: No horizontal scrollbar on any section; single device frame visible in CaseStudy
    why_human: CSS overflow rendering can only be confirmed in a real browser
  - test: Tap Experience entries on a real touch device or Chrome touch simulation
    expected: Entries expand and collapse on tap when hover is not supported
    why_human: Touch event behavior depends on browser environment and runtime media queries
---

# Phase 6: Ship Verification Report

**Phase Goal:** The site is live at naqeebali.me, fast on mobile, findable by search engines, and passes performance budget.
**Verified:** 2026-03-20T11:00:00Z
**Status:** PASSED
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | First meaningful paint under 200KB gzipped (excl. lazy 3D bundle) | VERIFIED | Main JS 115.89 kB + CSS 7.45 kB + HTML 0.81 kB + woff2 fonts ~36.5 kB = ~160.65 kB total |
| 2 | All sections render correctly on mobile; 3D hero replaced on low-end/mobile | VERIFIED | Visual container uses hidden lg:flex (hidden below 1024px); useDeviceCapability + HeroCSSFallback |
| 3 | Touch targets on all interactive elements >= 44px | VERIFIED | SocialLinks uses min-h-11 min-w-11; hamburger uses p-3 -m-3 box-content; overlay links use min-h-11 |
| 4 | Case study device frames: single frame on mobile | VERIFIED | Second DeviceFrame has className of hidden sm:block (CaseStudy.tsx line 178) |
| 5 | Experience entries tappable to expand on touch devices | VERIFIED | handleTouchToggle + useState toggle wired; onClick at entry level (line 144) |
| 6 | Meta tags, OG tags, Twitter Card, JSON-LD Person schema present and valid | VERIFIED | All present in index.html; JSON-LD parses as valid JSON; canonical = https://naqeebali.me |
| 7 | Vercel deployment configuration ready | VERIFIED | vercel.json with buildCommand, outputDirectory, SPA rewrites, Cache-Control headers |
| 8 | Production build succeeds; latin-only fonts; framer-motion and lodash absent | VERIFIED | Build passes; only latin font files in dist; framer-motion not in package.json or node_modules |

**Score:** 8/8 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| index.html | Complete SEO tags, OG, Twitter Card, JSON-LD, canonical | VERIFIED | All tags present; no keywords tag; JSON-LD valid; canonical = https://naqeebali.me |
| public/og-image.png | Static OG image > 1KB | VERIFIED | Exists at 23,281 bytes (22.7 kB) |
| vercel.json | Vite deployment config with rewrites | VERIFIED | buildCommand, outputDirectory, framework, rewrites, Cache-Control headers all present |
| src/App.tsx | Semantic footer landmark | VERIFIED | footer element at line 28 |
| src/main.tsx | Latin-only font imports | VERIFIED | Imports latin-700.css and latin-400.css (not all-subset) |
| src/sections/CaseStudy.tsx | Mobile-responsive; hidden second device frame | VERIFIED | hidden sm:block on second DeviceFrame; w-40 sm:w-52 ArchBox; gap-4 sm:gap-8 branches |
| src/sections/Experience.tsx | Tap-to-expand via onClick | VERIFIED | handleTouchToggle toggles touchOpen state; onClick wired at entry level |
| src/components/SocialLinks.tsx | 44px touch targets | VERIFIED | min-h-11 min-w-11 on each anchor |
| src/components/Navbar/Navbar.tsx | Expanded hamburger tap area | VERIFIED | p-3 -m-3 box-content on hamburger button |
| package.json | framer-motion and lodash absent | VERIFIED | Neither in dependencies or devDependencies; not installed in node_modules |
| scripts/generate-og.mjs | Puppeteer OG generation script | VERIFIED | Exists at 2,013 bytes |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| index.html | public/og-image.png | og:image meta tag | VERIFIED | og:image content = https://naqeebali.me/og-image.png |
| index.html | https://naqeebali.me | link rel=canonical | VERIFIED | canonical href=https://naqeebali.me |
| src/main.tsx | @fontsource latin CSS | import statement | VERIFIED | latin-700.css and latin-400.css imported |
| Hero.tsx | HeroCSSFallback | conditional on canRender3D | VERIFIED | Ternary renders HeroCSSFallback when canRender3D is false; also Suspense fallback |
| Hero.tsx | 3D visual hidden on mobile | hidden lg:flex CSS class | VERIFIED | Visual container is display:none below 1024px |

### Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| TECH-01: Performance budget under 200KB gzipped | SATISFIED | ~160.65 kB first load (excluding lazy HeroScene 3D bundle at 261 kB gzip) |
| TECH-02: Mobile responsive, touch-optimized | SATISFIED | All structural checks pass; visual confirmation is a human verification item |
| TECH-03: SEO -- meta tags, OG, JSON-LD, semantic HTML | SATISFIED | Complete; section/main/nav/footer landmarks present; single h1 preserved |
| TECH-04: Vercel deployment config (localhost-only per user decision) | SATISFIED | vercel.json present; no actual deployment needed for this phase |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/components/ui/neon-flow.tsx | 2 | framer-motion import in legacy file | INFO | Orphaned -- not imported by any active component; framer-motion not installed |
| src/components/ui/timeline.tsx | 6 | framer-motion import in legacy file | INFO | Orphaned -- not imported by any active component; framer-motion not installed |

No blockers. Both legacy ui/ files are disconnected from the active component tree. Since framer-motion is not installed, they cannot cause a build or runtime error as-is.

### Human Verification Required

#### 1. Lighthouse Score Verification

**Test:** Start production preview with node node_modules/vite/bin/vite.js preview, then run Lighthouse on http://localhost:4173 in Chrome DevTools Lighthouse tab or via CLI.
**Expected:** Performance >= 90, Accessibility >= 90, Best Practices >= 90, SEO >= 90.
**Why human:** Requires a running browser. Structural prerequisites in place: latin-only fonts, no render-blocking scripts, semantic HTML, complete SEO tags, lazy-loaded 3D bundle.

#### 2. Mobile Visual Verification at 375px

**Test:** Open production preview with browser DevTools at 375px width. Scroll through all five sections: Hero, HowIBuild, CaseStudy, Experience, Contact.
**Expected:** No horizontal scrollbar; single device frame in CaseStudy; all typography readable; no content clipped.
**Why human:** CSS overflow rendering cannot be verified from static code analysis.

#### 3. Touch Expand on Experience Entries

**Test:** Open on a real mobile device or Chrome DevTools touch simulation. Scroll to Experience. Tap any company entry.
**Expected:** Entry expands to show tech stack pills and key achievement. Tapping again or another entry collapses it.
**Why human:** Touch media query evaluation and event dispatch must be tested in a live browser context.

### Gaps Summary

No gaps. All automated checks pass. The three human verification items are standard QA confirmations of correct runtime behavior -- not implementation gaps.

Cleanup note for a future housekeeping phase: two orphaned legacy files (src/components/ui/neon-flow.tsx, src/components/ui/timeline.tsx) hold dead framer-motion imports. They are harmless but could be removed.

---

_Verified: 2026-03-20T11:00:00Z_
_Verifier: Claude (gsd-verifier)_
