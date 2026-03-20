import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { howIBuildStatements } from '@/data/content';

export function HowIBuild() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const statements = gsap.utils.toArray<HTMLElement>('.statement');

        gsap.set(statements, { opacity: 0, y: 60 });

        gsap.to(statements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="how-i-build" className="bg-bg-feature py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <div data-cursor="text" className="space-y-10 sm:space-y-16 lg:space-y-24">
          {howIBuildStatements.map((statement, index) => (
            <p
              key={index}
              className="statement font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text max-w-4xl"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
