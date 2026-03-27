import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { HeroPortrait } from './HeroPortrait';
import GravityGrid from '@/components/atoms/GravityGrid';
import SplitFlapDisplay from 'react-split-flap-display';
import { ALPHA } from 'react-split-flap-display/constants';
import './HeroFlap.css';

const ROLES = ['DevOps Engineer', 'Full Stack Engineer', 'AI Engineer'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. FlipText handles name animation itself

        // 2. Thin line scales in (delayed to sync with flip)
        tl.from(lineRef.current, {
          scaleX: 0,
          duration: 0.5,
          delay: 0.8,
        });

        // 3. Role text fades in
        tl.from(roleRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.5,
        }, '-=0.2');

        // 4. Tagline fades in
        tl.from(taglineRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.5,
        }, '-=0.2');

        // 5. Portrait fades in
        tl.from(portraitRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
        }, '-=0.4');

        // Parallax on scroll
        gsap.to(nameRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Reduced motion: just show everything
      mm.add('(prefers-reduced-motion: reduce)', () => {
        // No-op, everything visible by default
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <GravityGrid cellSize={30} strength={0.5} radius={150} stiffness={0.05} damping={0.92} color="rgba(23, 18, 25, 0.08)" />
      <div className="relative z-10 w-full max-w-container mx-auto px-4 sm:px-5 lg:px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-20">
          {/* Left: Typography */}
          <div className="flex-1 text-center lg:text-left">
            <div ref={nameRef}>
              <h1 className="font-heading text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.1] text-text">
                Naqeebali<br />Shamsi
              </h1>
            </div>

            <div
              ref={lineRef}
              className="h-px w-20 bg-accent mt-6 mb-5 mx-auto lg:mx-0 origin-left"
            />

            <div ref={roleRef} className="hero-flap-role">
              <SplitFlapDisplay
                characterSet={ALPHA}
                value={ROLES[roleIndex].toUpperCase()}
                fontSize="clamp(1rem, 1.8vw, 1.4rem)"
                characterWidth="2em"
                step={60}
                borderColor="#2a2230"
                background="#1a1520"
                textColor="#FFFAFF"
                padDirection="right"
                minLength={22}
              />
            </div>

            <p
              ref={taglineRef}
              className="font-body text-lg text-text-muted mt-4 max-w-md mx-auto lg:mx-0"
            >
              I make tech work harder so you don't have to
            </p>
          </div>

          {/* Right: Portrait */}
          <div ref={portraitRef} className="flex-shrink-0">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
