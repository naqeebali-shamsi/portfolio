# Phase 3 Plan 02: 3D Glass Icosahedron Summary

**One-liner:** Lazy-loaded R3F glass icosahedron with MeshTransmissionMaterial, cursor follow, ambient rotation, IntersectionObserver lifecycle, and device-gated rendering.

## What Was Done

### Task 1: Install R3F ecosystem and create GlassIcosahedron + HeroScene
- Installed three@0.183, @react-three/fiber@9.5 (React 19 compatible), @react-three/drei@10.7
- Created `GlassIcosahedron.tsx`: glass transmission material with accent tint (#70ABAF), lerped cursor follow (factor 0.03), constant ambient Y rotation (+0.002/frame)
- Created `HeroScene.tsx`: R3F Canvas with normalized pointer tracking, IntersectionObserver (100px rootMargin) that unmounts Canvas entirely when hero scrolls out of view, disposing WebGL context
- **Commit:** `d66692f`

### Task 2: Wire lazy-loaded 3D into Hero.tsx with device detection gating
- Added `React.lazy(() => import('./HeroScene'))` at module scope — three.js stays out of main bundle
- Conditional rendering: `canRender3D` from `useDeviceCapability()` gates 3D vs permanent CSS fallback
- Suspense wraps lazy component with `<HeroCSSFallback />` as loading state
- Build confirms code splitting: main bundle 284KB, HeroScene chunk 896KB (separate)
- **Commit:** `29ed52f`

## Deviations from Plan

None — plan executed exactly as written.

## Key Files

| File | Role |
|------|------|
| `src/components/Hero/GlassIcosahedron.tsx` | Glass icosahedron mesh with cursor follow + ambient rotation |
| `src/components/Hero/HeroScene.tsx` | Lazy-loaded R3F Canvas with IntersectionObserver lifecycle |
| `src/components/Hero/Hero.tsx` | Updated: React.lazy + Suspense + device gating |
| `package.json` | Added three, @react-three/fiber, @react-three/drei |

## HERO Requirements Status

All five HERO requirements now satisfied:

| Req | Description | Status |
|-----|-------------|--------|
| HERO-01 | Full-viewport hero with text + 3D columns | Done (03-01) |
| HERO-02 | Typewriter cycling titles via GSAP | Done (03-01) |
| HERO-03 | 3D glass icosahedron with glass material | Done (03-02) |
| HERO-04 | Lazy loading with CSS fallback + device gating | Done (03-02) |
| HERO-05 | WebGL disposal on scroll-away | Done (03-02) |

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| MeshTransmissionMaterial with backside=false | Avoids double render cost; resolution=256 keeps GPU usage low |
| Canvas unmount (not frameloop="never") | Full WebGL context disposal vs just pausing render loop |
| 100px rootMargin on IntersectionObserver | Prevents flicker from rapid mount/unmount at scroll boundary |
| R3F v9 | Required for React 19 compatibility |

## Metrics

- **Tasks:** 2/2 completed
- **Duration:** ~3min
- **Completed:** 2026-03-18
