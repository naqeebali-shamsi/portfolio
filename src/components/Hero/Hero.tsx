import React, { Suspense, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { HeroText } from './HeroText';
import { HeroCSSFallback } from './HeroCSSFallback';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

const HeroScene = React.lazy(() => import('./HeroScene'));

export function Hero() {
  const { canRender3D } = useDeviceCapability();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const textContainer = sectionRef.current?.querySelector('[data-parallax="text"]');
        const visualContainer = sectionRef.current?.querySelector('[data-parallax="visual"]');

        if (textContainer) {
          gsap.to(textContainer, {
            yPercent: 5,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        if (visualContainer) {
          gsap.to(visualContainer, {
            yPercent: -10,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-[100dvh] flex items-center px-8 max-w-container mx-auto"
    >
      <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16 py-16">
        {/* Left -- Text content */}
        <div data-parallax="text" className="flex-1 w-full">
          <HeroText />
        </div>

        {/* Right -- 3D element or CSS fallback */}
        <div data-parallax="visual" className="flex-1 w-full hidden lg:flex items-center justify-center">
          {canRender3D ? (
            <Suspense fallback={<HeroCSSFallback />}>
              <HeroScene />
            </Suspense>
          ) : (
            <HeroCSSFallback />
          )}
        </div>
      </div>
    </section>
  );
}
