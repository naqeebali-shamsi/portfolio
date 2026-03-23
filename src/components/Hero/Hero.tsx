import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { HeroText } from './HeroText';
import { HeroPortrait } from './HeroPortrait';
import GravityGrid from '@/components/atoms/GravityGrid';
import { heroTitles } from '@/data/content';

export function Hero() {
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
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      <GravityGrid cellSize={30} strength={0.5} radius={150} stiffness={0.05} damping={0.92} color="rgba(50, 41, 47, 0.08)" />
      <div className="relative z-10 flex flex-col items-center w-full gap-10 py-12 px-4 sm:px-5 lg:px-6 max-w-container mx-auto">
        {/* Portrait with marquee behind */}
        <div data-parallax="visual" className="relative">
          {/* Title marquee behind the pill */}
          <div className="hero-marquee" aria-hidden="true">
            <div className="hero-marquee__track">
              {[...heroTitles, ...heroTitles, ...heroTitles, ...heroTitles].map((title, i) => (
                <span key={i} className="hero-marquee__item">{title}</span>
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <HeroPortrait />
          </div>
        </div>

        {/* Text content */}
        <div data-parallax="text" className="text-center">
          <HeroText />
        </div>
      </div>
    </section>
  );
}
