# Phase 3: Hero Section - Research

**Researched:** 2026-03-18
**Domain:** React Three Fiber glass materials, GSAP typewriter, device detection, WebGL lifecycle
**Confidence:** HIGH

## Summary

The hero section requires three distinct technical domains: (1) a GSAP-driven typewriter with type-delete-retype cycling, (2) a React Three Fiber 3D glass icosahedron using drei's MeshTransmissionMaterial, and (3) device detection plus WebGL lifecycle management for conditional rendering and GPU cleanup.

The standard stack is well-established: `three` + `@react-three/fiber` v9 (React 19 compatible) + `@react-three/drei` for the glass material. GSAP 3.14 with TextPlugin handles the typewriter. No exotic or bleeding-edge libraries are needed -- everything is production-stable.

**Primary recommendation:** Use MeshTransmissionMaterial (not MeshRefractionMaterial) for the glass icosahedron -- it provides chromatic aberration, noise-based roughness blur, and works without a required environment map. Implement the typewriter as a custom GSAP timeline (not TextPlugin alone) for the type-delete-retype pattern. Conditionally unmount the entire `<Canvas>` via React state to guarantee WebGL disposal.

## Standard Stack

### Core (NEW packages to install)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| three | ^0.183.0 | 3D engine | Required peer dep for R3F |
| @react-three/fiber | ^9.5.0 | React renderer for Three.js | v9 pairs with React 19 |
| @react-three/drei | ^10.7.0 | Helper components (materials, geometries) | MeshTransmissionMaterial, Icosahedron |
| gsap | ^3.14.0 | Animation library | TextPlugin, timeline, all plugins now free |

### Already Installed
| Library | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| tailwindcss | ^4.1.18 | Styling |
| @fontsource/space-grotesk | ^5.2.10 | Display font for hero name |
| @fontsource/inter | ^5.2.10 | Body font for tagline |

### To Remove (Phase 4, not this phase)
| Library | Reason |
|---------|--------|
| framer-motion | Decision: GSAP only. Remove when Phase 4 replaces its usages |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| MeshTransmissionMaterial | MeshRefractionMaterial | Refraction requires an envMap texture (extra asset), less flexible for accent-tinted glass |
| MeshTransmissionMaterial | MeshPhysicalMaterial (vanilla Three.js) | No chromatic aberration, no noise blur, weaker glass effect |
| GSAP TextPlugin | Custom React state typewriter | TextPlugin alone cannot do type-delete-retype; custom state approach is cleaner for this pattern |
| Conditional Canvas unmount | Canvas `frameloop="never"` | frameloop="never" stops rendering but keeps WebGL context alive -- does NOT satisfy HERO-05 |

**Installation:**
```bash
npm install three @react-three/fiber @react-three/drei gsap
```

**TypeScript types:** `three` ships its own types. `@react-three/fiber` and `@react-three/drei` ship their own types. No `@types/` packages needed.

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   └── Hero/
│       ├── Hero.tsx              # Main hero section container
│       ├── HeroText.tsx          # Name, typewriter, tagline (left side)
│       ├── Typewriter.tsx        # GSAP typewriter logic
│       ├── HeroScene.tsx         # R3F Canvas + 3D content (lazy-loaded)
│       ├── GlassIcosahedron.tsx  # The 3D mesh + material
│       ├── HeroCSSFallback.tsx   # CSS-only animated fallback
│       └── useDeviceCapability.ts # Hook for hardware detection
```

### Pattern 1: Conditional Canvas Mounting for WebGL Disposal
**What:** Mount/unmount the entire `<Canvas>` based on viewport visibility to guarantee WebGL context disposal.
**When to use:** When the 3D element is in a single section and must not consume GPU when off-screen.
**Why:** R3F `<Canvas>` disposes the WebGL renderer on unmount. Using `frameloop="never"` only pauses rendering but keeps the context alive. Unmounting is the only reliable way to release the GPU context.

```typescript
// IntersectionObserver to track hero visibility
const [heroVisible, setHeroVisible] = useState(true);
const heroRef = useRef<HTMLElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setHeroVisible(entry.isIntersecting),
    { threshold: 0, rootMargin: '100px' } // small buffer to avoid flash
  );
  if (heroRef.current) observer.observe(heroRef.current);
  return () => observer.disconnect();
}, []);

// In JSX: conditionally render the lazy-loaded 3D component
{heroVisible && !isLowEnd && (
  <Suspense fallback={<HeroCSSFallback />}>
    <HeroScene />
  </Suspense>
)}
```

### Pattern 2: React.lazy for R3F Code-Splitting
**What:** Lazy-load the entire R3F scene so three.js (~600KB) is not in the main bundle.
**When to use:** Always -- three.js is large and the hero 3D is not critical for first paint.

```typescript
const HeroScene = React.lazy(() => import('./HeroScene'));

// In parent:
<Suspense fallback={<HeroCSSFallback />}>
  <HeroScene />
</Suspense>
```

**Key detail:** The `<Canvas>` component must be inside the lazy-loaded module, not in the parent. This ensures three.js is only imported when the lazy component loads.

### Pattern 3: GSAP Typewriter with Timeline
**What:** A GSAP timeline that types text character-by-character, pauses, deletes, then types the next string. Loops infinitely.
**When to use:** For the rotating titles (Cloud Developer, Solution Architect, Full Stack Developer).
**Why not TextPlugin alone:** TextPlugin replaces text content but doesn't natively produce the "backspace then retype" visual. A custom approach using React state + GSAP timeline gives precise control.

```typescript
// Approach: Use gsap.timeline() to orchestrate typing/deleting
// Each title gets: type forward -> pause -> delete backward -> pause -> next

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const titles = ['Cloud Developer', 'Solution Architect', 'Full Stack Developer'];

function useTypewriter(strings: string[], typeSpeed = 0.05, deleteSpeed = 0.03, pauseTime = 1.5) {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      strings.forEach((str, i) => {
        // Type forward
        for (let c = 1; c <= str.length; c++) {
          tl.call(() => setDisplayText(str.slice(0, c)), [], `+=${typeSpeed}`);
        }
        // Pause at full text
        tl.addPause(`+=${pauseTime}`);
        tl.call(() => tl.resume(), [], `+=${pauseTime}`);
        // Delete backward
        for (let c = str.length - 1; c >= 0; c--) {
          tl.call(() => setDisplayText(str.slice(0, c)), [], `+=${deleteSpeed}`);
        }
        // Brief pause before next
        tl.call(() => {}, [], `+=0.3`);
      });
    });

    return () => ctx.revert();
  }, []);

  return displayText;
}
```

**Alternative simpler approach:** Use `setInterval`/`setTimeout` with React state for the typing logic, and GSAP only for the cursor blink animation. This is often cleaner since the typing is state-driven, not DOM-manipulation-driven.

### Pattern 4: Device Capability Detection
**What:** Check `navigator.hardwareConcurrency` and `navigator.deviceMemory` to skip 3D on low-end devices.
**Browser support:**
- `hardwareConcurrency`: 92% browser support (Chrome, Firefox, Safari all supported)
- `deviceMemory`: Chromium-only (NOT available in Firefox or Safari)

```typescript
function useDeviceCapability(): { isLowEnd: boolean; checked: boolean } {
  const [result, setResult] = useState({ isLowEnd: false, checked: false });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4; // default to capable
    const memory = (navigator as any).deviceMemory || 8; // default to capable (Safari/FF don't expose this)
    const isLowEnd = cores < 4 || memory < 4;
    setResult({ isLowEnd, checked: true });
  }, []);

  return result;
}
```

**Critical note:** `deviceMemory` is NOT available in Firefox or Safari. Default to "capable" (high value) when unavailable -- only Chromium browsers with genuinely low specs will trigger the fallback.

### Pattern 5: MeshTransmissionMaterial Glass Icosahedron
**What:** An icosahedron geometry with MeshTransmissionMaterial for glass refraction effect.

```typescript
import { Canvas } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { IcosahedronGeometry } from 'three';

function GlassIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} /> {/* radius=1, detail=0 for sharp facets */}
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.5}
        roughness={0.1}
        chromaticAberration={0.03}
        anisotropicBlur={0.1}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
        color="#70ABAF"       // accent color tint
        backside={true}       // render backfaces for better glass look
        backsideThickness={0.3}
        resolution={256}      // lower = better perf, 256 is good balance
        samples={6}
      />
    </mesh>
  );
}
```

**Performance note:** MeshTransmissionMaterial performs an additional render pass (FBO). Keep `resolution` low (256 or even 128) and `samples` at 6 or fewer. The `backside` option doubles the render cost but significantly improves glass realism.

### Anti-Patterns to Avoid
- **Mounting Canvas in parent, scene in lazy child:** The `<Canvas>` itself must be in the lazy-loaded component, otherwise three.js is in the main bundle.
- **Using `frameloop="never"` for disposal:** This only pauses rendering. The WebGL context remains alive. Unmount the Canvas to truly dispose.
- **Animating DOM text with GSAP in React without gsap.context():** Always wrap GSAP animations in `gsap.context()` and call `ctx.revert()` on cleanup to avoid memory leaks and stale references.
- **Setting `deviceMemory` threshold without fallback:** Safari and Firefox do not expose `deviceMemory`. Never treat undefined as "low" -- default to capable.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Glass/refraction material | Custom shaders | drei `MeshTransmissionMaterial` | Handles chromatic aberration, backside rendering, FBO management, noise blur |
| Icosahedron geometry | Manual vertex math | Three.js `IcosahedronGeometry` (available as `<icosahedronGeometry>` in R3F) | Standard primitive, zero setup |
| WebGL disposal | Manual renderer.dispose() calls | Unmount `<Canvas>` component | R3F handles full cleanup on unmount |
| Environment lighting | Custom light rigs | drei `<Environment>` or `<ContactShadows>` | Provides HDR environment maps with zero config |
| Cursor position tracking | Raw mousemove listeners | R3F `useFrame` + `state.pointer` | Already normalized to [-1, 1] range, available in render loop |

**Key insight:** drei exists specifically to prevent hand-rolling common R3F patterns. Every "helper" in this phase has a drei equivalent.

## Common Pitfalls

### Pitfall 1: Three.js Bundle Size Surprise
**What goes wrong:** `three` is ~600KB minified. Without code-splitting, it lands in the main bundle and destroys LCP.
**Why it happens:** Importing three.js anywhere in non-lazy code pulls the entire library.
**How to avoid:** Keep ALL three.js/R3F imports inside the lazy-loaded component. No three.js types or imports in the parent Hero component.
**Warning signs:** Main bundle exceeds 300KB; `three` appears in Vite's build output for the entry chunk.

### Pitfall 2: MeshTransmissionMaterial Performance
**What goes wrong:** Glass material renders at full resolution with backside=true, causing frame drops on mid-range devices.
**Why it happens:** MeshTransmissionMaterial renders the scene to an FBO (framebuffer object) for refraction. `backside=true` doubles this.
**How to avoid:** Set `resolution={256}` or lower. Use `samples={4-6}`. Profile on a mid-range device.
**Warning signs:** GPU time per frame exceeds 16ms; visible frame drops when icosahedron is on screen.

### Pitfall 3: GSAP Cleanup in React
**What goes wrong:** Animations continue running after component unmount, causing "setState on unmounted component" warnings or visual glitches.
**Why it happens:** GSAP timelines are external to React's lifecycle.
**How to avoid:** Always use `gsap.context()` and call `ctx.revert()` in the useEffect cleanup.
**Warning signs:** Console warnings about state updates on unmounted components; animations that persist after navigation.

### Pitfall 4: Canvas Fallback Prop vs Suspense Fallback
**What goes wrong:** Confusing R3F Canvas `fallback` prop (for WebGL unsupported) with React `Suspense fallback` (for lazy loading).
**Why it happens:** Both use the word "fallback" but serve different purposes.
**How to avoid:** Use BOTH: `<Canvas fallback={<div>WebGL not supported</div>}>` for hard failure, and `<Suspense fallback={<CSSFallback />}>` wrapping the lazy component for loading state.

### Pitfall 5: 100vh on Mobile
**What goes wrong:** `100vh` includes the browser chrome on mobile, causing content to be cut off.
**Why it happens:** Mobile browsers have dynamic toolbar heights.
**How to avoid:** Use `100dvh` (dynamic viewport height) instead of `100vh`. Tailwind 4 supports `h-dvh`.
**Warning signs:** Hero content cut off on iOS Safari.

### Pitfall 6: WebGL Context Limit
**What goes wrong:** Browser has a limited number of WebGL contexts (typically 8-16). If Canvas is not properly disposed, contexts accumulate.
**Why it happens:** Hot module replacement in dev can create multiple contexts. Or if Canvas is conditionally re-mounted rapidly.
**How to avoid:** Unmount Canvas cleanly. In dev, watch for context lost warnings. Add debounce/threshold to IntersectionObserver to avoid rapid mount/unmount cycles.

## Code Examples

### Canvas Setup with Performance Defaults
```typescript
// Source: R3F docs + drei docs
import { Canvas } from '@react-three/fiber';

function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}           // cap pixel ratio for performance
      gl={{ antialias: true, alpha: true }}  // transparent background
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <GlassIcosahedron />
    </Canvas>
  );
}
```

### Cursor-Following Rotation
```typescript
// Source: R3F useFrame + state.pointer
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function GlassIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Target rotation for smooth lerp
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Gentle cursor follow (state.pointer is [-1, 1] range)
    target.current.x = state.pointer.y * 0.3; // small multiplier = gentle
    target.current.y = state.pointer.x * 0.3;

    // Smooth lerp toward target
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      target.current.x,
      delta * 2 // speed of follow
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      target.current.y,
      delta * 2
    );

    // Slow ambient rotation always applied
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial /* ...props */ />
    </mesh>
  );
}
```

### CSS Fallback - Animated Gradient Orb
```css
/* Accent-tinted orb that pulses and rotates subtly */
.hero-fallback-orb {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(153, 225, 217, 0.4),   /* accent-light */
    rgba(112, 171, 175, 0.2),   /* accent */
    transparent 70%
  );
  filter: blur(2px);
  animation: fallback-pulse 4s ease-in-out infinite, fallback-rotate 20s linear infinite;
}

@keyframes fallback-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes fallback-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Typewriter Cursor with GSAP
```typescript
// Blinking cursor using GSAP
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function TypewriterCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      });
    });
    return () => ctx.revert();
  }, []);

  return <span ref={cursorRef} className="text-accent">|</span>;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `100vh` for full viewport | `100dvh` (dynamic viewport height) | CSS spec 2022, broad support 2023+ | Fixes mobile browser chrome issue |
| Custom glass shaders | drei MeshTransmissionMaterial | drei v9+ (2023) | Production-quality glass in ~10 lines |
| GSAP paid plugins (SplitText, etc.) | All GSAP plugins free | 2024 | TextPlugin, SplitText all free to use |
| @react-three/fiber v8 + React 18 | @react-three/fiber v9 + React 19 | 2024 | Must use v9 for React 19 compat |
| MeshPhysicalMaterial transmission | MeshTransmissionMaterial (drei) | 2023+ | Chromatic aberration, noise blur, sees other transmissive objects |

**Deprecated/outdated:**
- **react-three-fiber (old npm package name):** Use `@react-three/fiber` (scoped package). The old name is deprecated.
- **drei v9 and earlier:** Use v10+ for R3F v9 compatibility.
- **Typed.js / react-typed:** Not needed -- GSAP TextPlugin or custom hook is lighter and avoids an extra dependency.

## Open Questions

1. **MeshTransmissionMaterial + transparent Canvas background**
   - What we know: Canvas `gl={{ alpha: true }}` makes the WebGL canvas transparent. MeshTransmissionMaterial renders to an FBO.
   - What's unclear: Whether the FBO correctly composites over a transparent background, or if a `background` prop needs explicit configuration.
   - Recommendation: Test during implementation. If FBO shows black background, set `background={new THREE.Color('#FAFAF5')}` on the material to match page bg.

2. **Exact MeshTransmissionMaterial prop tuning for accent-tinted glass**
   - What we know: `color="#70ABAF"` tints the material. `chromaticAberration`, `thickness`, `distortion` all affect the look.
   - What's unclear: The exact combination that produces "premium glass" vs "plastic" at the chosen accent color.
   - Recommendation: Create a dev-time prop tweaker (drei `<Leva>` or manual sliders) to dial in values visually. Remove before shipping.

3. **Environment map necessity**
   - What we know: MeshTransmissionMaterial works without an explicit envMap but looks better with one. MeshRefractionMaterial requires one.
   - What's unclear: Whether the glass icosahedron looks good enough with just ambient + directional light, or if a minimal `<Environment preset="city" />` is needed.
   - Recommendation: Start without Environment, add if the glass looks flat. An Environment preset adds a small download but dramatically improves realism.

## Sources

### Primary (HIGH confidence)
- [drei MeshTransmissionMaterial docs](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material) - Full API, props, performance notes
- [drei MeshRefractionMaterial docs](https://drei.docs.pmnd.rs/shaders/mesh-refraction-material) - API, envMap requirement
- [R3F Canvas docs](https://r3f.docs.pmnd.rs/api/canvas) - frameloop, gl, dpr, fallback props
- [R3F Installation docs](https://r3f.docs.pmnd.rs/getting-started/installation) - React 19 compat, v9 pairing
- [GSAP TextPlugin docs](https://gsap.com/docs/v3/Plugins/TextPlugin/) - API, delimiter, speed options
- [MDN navigator.deviceMemory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory) - Chromium-only, returns power-of-2 values

### Secondary (MEDIUM confidence)
- [npm @react-three/fiber](https://www.npmjs.com/package/@react-three/fiber) - v9.5.0 latest, published 3 months ago
- [npm @react-three/drei](https://www.npmjs.com/package/@react-three/drei) - v10.7.7 latest
- [npm three](https://www.npmjs.com/package/three) - v0.183.2, published 18 days ago
- [npm gsap](https://www.npmjs.com/package/gsap) - v3.14.2 latest, all plugins now free
- [caniuse hardwareConcurrency](https://caniuse.com/hardwareconcurrency) - 92% browser support
- [caniuse deviceMemory](https://caniuse.com/mdn-api_navigator_devicememory) - Chromium-only

### Tertiary (LOW confidence)
- [R3F GitHub Issue #2655](https://github.com/pmndrs/react-three-fiber/issues/2655) - Canvas unmount disposal behavior
- [R3F GitHub Issue #3093](https://github.com/pmndrs/react-three-fiber/issues/3093) - WebGLRenderer leak on unmount
- [GSAP community forums](https://gsap.com/community/forums/topic/40044-multiple-line-typewriter-animation-with-looping-final-words/) - Typewriter with looping words pattern

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Versions verified via npm, React 19 compat confirmed in official docs
- Architecture (R3F patterns): HIGH - Canvas disposal, lazy loading, MeshTransmissionMaterial all documented in official sources
- Architecture (typewriter): MEDIUM - Type-delete-retype pattern uses custom logic atop GSAP; no single canonical implementation
- Device detection: HIGH - API availability verified via MDN and caniuse
- Pitfalls: MEDIUM - Gathered from GitHub issues and community patterns, not all personally verified
- CSS fallback: MEDIUM - Standard CSS techniques, specific design is discretionary

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (30 days -- stable ecosystem, no anticipated breaking changes)
