import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { caseStudy } from '@/data/content';
import { DeviceFrame } from '@/components/DeviceFrame';
import { Smartphone, ExternalLink } from 'lucide-react';

export function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { desktop, mobile } = context.conditions!;

          const intro = sectionRef.current?.querySelector('.cs-intro') as HTMLElement | null;
          const arch = sectionRef.current?.querySelector('.cs-architecture') as HTMLElement | null;
          const approach = sectionRef.current?.querySelector('.cs-approach') as HTMLElement | null;

          if (desktop) {
            // Pin-and-scrub sequential reveal
            if (intro && arch && approach) {
              // Set initial hidden states
              gsap.set(arch, { opacity: 0, y: 60 });
              gsap.set(approach, { opacity: 0, y: 60 });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  pin: true,
                  scrub: 1,
                  start: 'top top',
                  end: '+=200%',
                },
              });

              // Phase 1: Intro is visible, then slides up/fades
              tl.fromTo(
                intro,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -40, duration: 0.3 }
              );

              // Phase 2: Architecture block reveals
              tl.fromTo(
                arch,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.3 }
              );

              // Phase 2b: Architecture slides up/fades
              tl.fromTo(
                arch,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -40, duration: 0.3 },
                '+=0.1'
              );

              // Phase 3: Approach block reveals
              tl.fromTo(
                approach,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.3 }
              );
            }
          }

          if (mobile) {
            // Simple stagger reveals (no pin, no scrub)
            const targets = [intro, arch, approach].filter(Boolean) as HTMLElement[];
            const starts = ['top 80%', 'top 75%', 'top 85%'];

            targets.forEach((el, i) => {
              gsap.set(el, { opacity: 0, y: 40 });
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: starts[i],
                  once: true,
                },
              });
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="py-section scroll-mt-20">
      {/* 1. Contained intro */}
      <div className="cs-intro max-w-container mx-auto px-8">
        <p className="text-sm uppercase tracking-wide text-text-muted font-heading">
          Case Study
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3">
          {caseStudy.name}
        </h2>
        <p className="font-body text-lg text-text-muted max-w-3xl mt-6">
          {caseStudy.problem}
        </p>
      </div>

      {/* 2. Full-width breakout -- architecture + screenshots */}
      <div className="cs-architecture w-full bg-bg-feature mt-16 py-16">
        <div className="max-w-container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT column -- Architecture diagram */}
            <div>
              <p className="text-sm uppercase tracking-wide text-text-muted font-heading mb-8">
                Architecture
              </p>

              {/* Flow diagram */}
              <div className="flex flex-col items-center gap-0">
                <ArchBox label="React Native" sublabel="Mobile Client" />
                <Arrow />
                <ArchBox label="Go API" sublabel="REST + WebSockets" />
                <div className="flex gap-8 items-start">
                  <div className="flex flex-col items-center gap-0">
                    <Arrow />
                    <ArchBox label="PostgreSQL" sublabel="Relational Data" />
                  </div>
                  <div className="flex flex-col items-center gap-0">
                    <Arrow />
                    <ArchBox label="WebSockets" sublabel="Real-time Sync" />
                  </div>
                </div>
                <Arrow />
                <ArchBox label="AWS" sublabel="Cloud Infrastructure" accent />
              </div>

              {/* Tech decisions */}
              <ul className="mt-10 space-y-3">
                {caseStudy.techDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-base text-text-muted">
                    <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT column -- Phone mockups */}
            <div>
              <div className="flex gap-6 justify-center">
                <DeviceFrame className="flex-shrink-0">
                  <div className="flex flex-col items-center justify-center h-full bg-bg text-text-muted text-sm gap-3">
                    <Smartphone className="w-8 h-8 opacity-40" />
                    <span>App Screenshot</span>
                  </div>
                </DeviceFrame>
                <DeviceFrame className="flex-shrink-0">
                  <div className="flex flex-col items-center justify-center h-full bg-bg text-text-muted text-sm gap-3">
                    <Smartphone className="w-8 h-8 opacity-40" />
                    <span>App Screenshot</span>
                  </div>
                </DeviceFrame>
              </div>

              {/* GitHub link */}
              {caseStudy.repoUrl && (
                <div className="mt-8 text-center">
                  <a
                    href={caseStudy.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-body text-base"
                  >
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Contained outro -- approach */}
      <div className="cs-approach max-w-container mx-auto px-8 mt-16">
        <p className="text-sm uppercase tracking-wide text-text-muted font-heading mb-4">
          Approach
        </p>
        <p className="font-body text-lg text-text-muted max-w-3xl">
          {caseStudy.approach}
        </p>
      </div>
    </section>
  );
}

/* ---- Architecture diagram helper components ---- */

function ArchBox({
  label,
  sublabel,
  accent,
}: {
  label: string;
  sublabel: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg px-6 py-3 text-center w-52 ${
        accent
          ? 'border-accent/40 bg-accent/5'
          : 'border-accent/20 bg-white'
      }`}
    >
      <p className="font-heading text-sm font-semibold text-text">{label}</p>
      <p className="font-body text-xs text-text-muted mt-0.5">{sublabel}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex flex-col items-center text-accent/40 py-1">
      <div className="w-px h-6 bg-accent/30" />
      <span className="text-xs leading-none">&#9660;</span>
    </div>
  );
}
