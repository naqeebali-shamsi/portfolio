# Phase 3 Plan 01: Hero Layout and Typewriter Summary

**One-liner:** Full-viewport hero with GSAP typewriter cycling three titles, CSS geometric fallback, and device capability detection hook.

## What Was Done

### Task 1: Install GSAP, add hero content data, create device capability hook
- Installed `gsap@3.14.2` as production dependency
- Added `heroTitles` (3 titles) and `heroTagline` to centralized `content.ts`
- Created `useDeviceCapability` hook checking `hardwareConcurrency` and `deviceMemory` with Safari/Firefox fallback

**Commit:** `c8b1540`

### Task 2: Create Hero components and wire into App.tsx
- `Typewriter.tsx` — GSAP timeline-driven type-delete-retype animation, 60ms typing / 35ms deleting, blinking cursor, infinite loop
- `HeroText.tsx` — Display name split across two lines, typewriter, tagline
- `HeroCSSFallback.tsx` — Layered geometric shapes with CSS animations (20s spin, 4s pulse, 6s float)
- `Hero.tsx` — 100dvh section, flex left/right layout, imports useDeviceCapability (stored for Plan 02)
- `App.tsx` — Replaced inline hero markup with `<Hero />` component

**Commit:** `6872e63`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Name split across two lines (Naqeebali / Shamsi) | Better visual impact at display scale, avoids horizontal overflow |
| CSS fallback hidden on mobile (`hidden lg:flex`) | Text-only on mobile keeps viewport clean; fallback is decorative |
| GSAP context-based cleanup (not timeline refs) | Cleaner pattern — `ctx.revert()` kills all nested timelines automatically |
| Prefixed unused var `_canRender3D` | Satisfies strict TS while keeping the hook call present for Plan 02 |

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- `npm ls gsap` — gsap@3.14.2 confirmed
- `npx tsc --noEmit` — zero errors in all new/modified files (pre-existing legacy errors unrelated)
- `npm run build` — production build succeeds in 2.06s
- Hero content exports verified in content.ts
- useDeviceCapability hook returns `{ canRender3D: boolean }`

## Files

### Created
- `src/components/Hero/Hero.tsx` — Full-viewport hero section (27 lines)
- `src/components/Hero/HeroText.tsx` — Name, typewriter, tagline (22 lines)
- `src/components/Hero/Typewriter.tsx` — GSAP type-delete-retype animation (79 lines)
- `src/components/Hero/HeroCSSFallback.tsx` — CSS animated geometric fallback (41 lines)
- `src/hooks/useDeviceCapability.ts` — Hardware detection hook (18 lines)

### Modified
- `package.json` — Added gsap dependency
- `src/data/content.ts` — Added heroTitles, heroTagline exports
- `src/App.tsx` — Replaced inline hero with Hero component import

## Next Phase Readiness

Plan 02 (3D element) is unblocked:
- `useDeviceCapability` hook is in place and called in `Hero.tsx`
- Right column renders `HeroCSSFallback` — Plan 02 swaps this for R3F canvas when `canRender3D` is true
- No blockers or concerns
