import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface SectionWithRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** If > 0, animates direct children individually with this stagger value */
  stagger?: number;
  /** Initial Y offset in pixels */
  y?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** ScrollTrigger start position */
  triggerStart?: string;
  /** GSAP easing function */
  ease?: string;
  /** Wrapper element tag */
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav' | 'ul' | 'ol';
}

/**
 * GSAP scroll-reveal wrapper that animates children into view
 * on scroll. Respects `prefers-reduced-motion`.
 *
 * Single element mode (default):
 *   Fades and slides the entire wrapper as one unit.
 *
 * Stagger mode (`stagger > 0`):
 *   Animates each direct child element individually with the given stagger.
 */
export function SectionWithReveal({
  children,
  className,
  delay = 0,
  stagger = 0,
  y = 40,
  duration = 0.7,
  triggerStart = 'top 80%',
  ease = 'power3.out',
  as: Tag = 'div',
}: SectionWithRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (stagger > 0) {
          // Stagger mode: animate each direct child element
          const targets = wrapperRef.current
            ? Array.from(wrapperRef.current.children)
            : [];

          if (!targets.length) return;

          gsap.set(targets, { opacity: 0, y });
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: triggerStart,
              once: true,
            },
          });
        } else {
          // Single unit mode: animate the wrapper itself
          const el = wrapperRef.current;
          if (!el) return;

          gsap.set(el, { opacity: 0, y });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          });
        }
      });
    },
    { scope: wrapperRef }
  );

  return (
    <Tag ref={wrapperRef as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
