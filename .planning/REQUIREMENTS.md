# Requirements: Premium Portfolio Website

**Defined:** 2026-03-18
**Core Value:** A visitor feels the craft within 2 seconds, reads sharp copy, sees engineering depth through one deep case study, and leaves thinking "this person builds things properly."

## v1 Requirements

### Hero

- [ ] **HERO-01**: Hero section renders name "Naqeebali Shamsi" with rotating typewriter titles (Cloud Developer, Solution Architect, Full Stack Developer) and tagline copy
- [ ] **HERO-02**: 3D geometric element (R3F) responds to cursor movement, lazy-loaded behind React.lazy() + Suspense
- [ ] **HERO-03**: CSS-only fallback renders when 3D is loading or on low-end devices (gradient/blur/static shape that looks intentional)
- [ ] **HERO-04**: Device capability detection skips 3D on low hardwareConcurrency/deviceMemory
- [ ] **HERO-05**: WebGL context disposed when user scrolls past hero section
- [ ] **HERO-06**: Custom cursor replaces default on desktop — morphs on interactive elements (grows on links, text mask on projects)

### Content

- [ ] **CONT-01**: "How I Build" section with engineering philosophy — big typography, beliefs about building software, how I think about systems
- [ ] **CONT-02**: NomadCrew deep case study — problem statement, approach, technical decisions (Go + React Native + AWS), architecture overview, App Store/Play Store links, embedded screenshots, outcome
- [ ] **CONT-03**: Experience timeline — minimal display of companies (Crest Data Systems, Opas Mobile, Propwise, Outlier AI) with years and role titles only
- [ ] **CONT-04**: Contact section with interactive email reveal mechanism + social links (LinkedIn, GitHub, Twitter/X)

### Design System

- [ ] **DESG-01**: Typography system — Space Grotesk for headings, Inter for body text, font-display: swap, antialiased rendering
- [ ] **DESG-02**: Light theme color palette — near-white background, dark text, 1-2 accent colors, consistent across all sections
- [ ] **DESG-03**: Extreme whitespace — generous padding between sections, content breathes, nothing feels crowded
- [ ] **DESG-04**: Navigation — minimal floating or hidden overlay nav, not a standard full-width top bar

### Animation

- [ ] **ANIM-01**: GSAP ScrollTrigger drives all scroll-linked animations — section reveals, text staggers, parallax effects
- [ ] **ANIM-02**: Smooth enter/exit transitions for elements as they scroll into view
- [ ] **ANIM-03**: Hover micro-interactions on interactive elements (links, project cards, nav items)

### Technical

- [ ] **TECH-01**: Performance budget — under 200KB gzipped for first meaningful paint (excluding lazy-loaded 3D bundle)
- [ ] **TECH-02**: Mobile responsive — all sections work on mobile with touch-optimized interactions, 3D hero replaced by CSS fallback
- [ ] **TECH-03**: SEO — proper meta tags, Open Graph tags, JSON-LD person schema, semantic HTML
- [ ] **TECH-04**: Deployment on Vercel with custom domain (naqeebali.me)

## v2 Requirements

### Content Expansion

- **CONT-05**: Propwise deep case study — backend/infrastructure narrative, async pipelines, RBAC, LLM features, system architecture diagram
- **CONT-06**: Technical writing links section — external links to Medium articles or blog posts
- **CONT-07**: Third project case study if a client project (RideSkipper, camera-repairs, or Reknown) gets properly designed

### Enhancements

- **ANIM-04**: Page transition animations if multi-page structure is adopted
- **DESG-05**: Marquee/ticker element for social proof if testimonials become available
- **TECH-05**: Analytics integration (Plausible or similar privacy-respecting tool)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Standalone Skills/Stack section | Technologies shown in context within case studies, not in isolation |
| Dark mode toggle | One theme done well, avoids switching complexity |
| Blog on the portfolio | Link externally, don't maintain a CMS |
| Testimonials section | No strong social proof available, don't fake it |
| Sound design / audio | Adds complexity without value for target audience |
| Framer Motion | GSAP handles all animation needs, no dual systems |
| CMS / admin panel | Content is static, managed in code |
| Multiple pages / routing | Single page scroll-driven experience |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 3 | Pending |
| HERO-06 | Phase 5 | Pending |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| DESG-01 | Phase 1 | Complete |
| DESG-02 | Phase 1 | Complete |
| DESG-03 | Phase 1 | Complete |
| DESG-04 | Phase 1 | Complete |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 4 | Pending |
| TECH-01 | Phase 6 | Pending |
| TECH-02 | Phase 6 | Pending |
| TECH-03 | Phase 6 | Pending |
| TECH-04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0

---
*Requirements defined: 2026-03-18*
*Last updated: 2026-03-18 after roadmap creation*
