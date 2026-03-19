import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experiences, education } from '@/data/content';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heading = sectionRef.current?.querySelector('[data-reveal="heading"]');
        const entries = gsap.utils.toArray<HTMLElement>('[data-reveal="entry"]');
        const eduBlock = sectionRef.current?.querySelector('[data-reveal="education"]');

        // Heading reveal
        if (heading) {
          gsap.set(heading, { opacity: 0, y: 40 });
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              once: true,
            },
          });
        }

        // Stagger entries
        if (entries.length) {
          gsap.set(entries, { opacity: 0, y: 40 });
          gsap.to(entries, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entries[0],
              start: 'top 80%',
              once: true,
            },
          });
        }

        // Education block
        if (eduBlock) {
          gsap.set(eduBlock, { opacity: 0, y: 40 });
          gsap.to(eduBlock, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eduBlock,
              start: 'top 85%',
              once: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="experience" className="bg-bg-feature py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-8">
        <h2
          data-reveal="heading"
          className="font-heading text-4xl md:text-5xl uppercase tracking-heading font-bold mb-12"
        >
          EXPERIENCE
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.company} data-reveal="entry" className="relative pl-10">
                {/* Dot */}
                <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-accent border-2 border-bg-feature" />

                <p className="font-body text-sm text-text-muted">{exp.period}</p>
                <h3 className="font-heading text-xl font-bold text-text mt-1">
                  {exp.company}
                </h3>
                <p className="font-body text-base text-text-muted">{exp.role}</p>
                <p className="font-body text-sm text-text-muted mt-1">
                  {exp.oneLiner}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div data-reveal="education" className="mt-16 pt-12 border-t border-accent/10">
          <h3 className="font-heading text-2xl uppercase tracking-heading font-bold mb-8">
            EDUCATION
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.institution}>
                <h4 className="font-heading text-lg font-bold">{edu.institution}</h4>
                <p className="font-body text-base text-text-muted">{edu.degree}</p>
                <p className="font-body text-sm text-text-muted">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
