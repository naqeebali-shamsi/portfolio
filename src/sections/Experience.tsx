import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experiences, education } from '@/data/content';
import { SectionWithReveal } from '@/components/molecules/SectionWithReveal';
import TechStackGrid from '@/components/molecules/TechStackGrid';
import { CareerMap } from '@/components/CareerMap';
import type { CareerLocation } from '@/components/CareerMap';
import { GraduationCap } from 'lucide-react';

/**
 * Build a chronologically-sorted list of career locations by merging
 * experiences and education entries. Sorted oldest-first so the flight
 * path traces the actual journey.
 */
function buildCareerLocations(): CareerLocation[] {
  const fromExperiences: CareerLocation[] = experiences.map((exp) => ({
    city: exp.location.city,
    country: exp.location.country,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    type: 'work' as const,
    lat: exp.location.lat,
    lng: exp.location.lng,
    techStack: [...exp.techStack],
  }));

  const fromEducation: CareerLocation[] = education.map((edu) => ({
    city: edu.location.city,
    country: edu.location.country,
    role: edu.degree,
    company: edu.institution,
    period: edu.period,
    type: 'education' as const,
    lat: edu.location.lat,
    lng: edu.location.lng,
  }));

  const all = [...fromExperiences, ...fromEducation];

  // Sort chronologically (oldest first) using the start year from the period string
  all.sort((a, b) => {
    const yearA = parseInt(a.period.split(' ')[0], 10) || 0;
    const yearB = parseInt(b.period.split(' ')[0], 10) || 0;
    return yearA - yearB;
  });

  // Deduplicate by city — keep first occurrence for the map pins
  const seen = new Set<string>();
  return all.filter((loc) => {
    if (seen.has(loc.city)) return false;
    seen.add(loc.city);
    return true;
  });
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contextRef = useRef<{ contextSafe: (fn: () => void) => () => void } | null>(null);

  const careerLocations = useMemo(() => buildCareerLocations(), []);

  // GSAP context solely for expand/collapse animations (contextSafe)
  useGSAP(
    (_, contextSafe) => {
      if (contextSafe) {
        contextRef.current = { contextSafe: contextSafe as (fn: () => void) => () => void };
      }
    },
    { scope: sectionRef }
  );

  const expandEntry = useCallback((index: number) => {
    const el = detailRefs.current[index];
    if (!el || !contextRef.current) return;

    const animate = contextRef.current.contextSafe(() => {
      // Collapse all others first
      detailRefs.current.forEach((ref, i) => {
        if (i !== index && ref) {
          gsap.to(ref, { height: 0, opacity: 0, duration: 0.25, ease: 'power3.out', overflow: 'hidden' });
        }
      });
      // Expand this one
      gsap.to(el, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power3.out' });
    });
    animate();
  }, []);

  const collapseEntry = useCallback((index: number) => {
    const el = detailRefs.current[index];
    if (!el || !contextRef.current) return;

    const animate = contextRef.current.contextSafe(() => {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power3.out' });
    });
    animate();
  }, []);

  // Only attach hover events on hover-capable devices
  const supportsHover = useRef(false);
  const [touchOpen, setTouchOpen] = useState<number | null>(null);
  useEffect(() => {
    supportsHover.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  const handleTouchToggle = useCallback((index: number) => {
    if (supportsHover.current) return;
    if (touchOpen === index) {
      collapseEntry(index);
      setTouchOpen(null);
    } else {
      if (touchOpen !== null) collapseEntry(touchOpen);
      expandEntry(index);
      setTouchOpen(index);
    }
  }, [touchOpen, expandEntry, collapseEntry]);

  return (
    <section ref={sectionRef} id="experience" className="bg-bg-feature py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
        {/* Section header */}
        <SectionWithReveal duration={0.6} triggerStart="top 85%">
          <p className="font-mono text-sm text-accent tracking-wide mb-3">/experience</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-heading font-bold mb-12">
            Career Journey
          </h2>
        </SectionWithReveal>

        {/* Career map */}
        <SectionWithReveal duration={0.8} triggerStart="top 85%" className="mb-8">
          <CareerMap locations={careerLocations} />
        </SectionWithReveal>

        {/* Detailed timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />

          <SectionWithReveal stagger={0.12} className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className="relative pl-10"
                onClick={() => handleTouchToggle(index)}
                onPointerEnter={() => {
                  if (supportsHover.current) expandEntry(index);
                }}
                onPointerLeave={() => {
                  if (supportsHover.current) collapseEntry(index);
                }}
              >
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

                {/* Expandable details (hidden by default) */}
                <div
                  ref={(el) => { detailRefs.current[index] = el; }}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="pt-3 pb-1">
                    {/* Tech stack pills */}
                    <TechStackGrid
                      technologies={[...exp.techStack]}
                      variant="tw"
                      gap="md"
                      className="mb-2"
                    />
                    {/* Key achievement */}
                    <p className="font-body text-sm italic text-text-muted">
                      {exp.keyAchievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </SectionWithReveal>
        </div>

        {/* Education */}
        <SectionWithReveal triggerStart="top 85%" className="mt-16 pt-12 border-t border-accent/10">
          <h3 className="font-heading text-2xl uppercase tracking-heading font-bold mb-8">
            EDUCATION
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.filter(e => e.institution !== 'Surat').map((edu) => (
              <div key={edu.institution} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-surface/50">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-bg-feature flex items-center justify-center">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold">{edu.institution}</h4>
                  <p className="font-body text-sm text-text-muted">{edu.degree}</p>
                  <p className="font-mono text-xs text-text-muted mt-1">{edu.period} · {edu.location.city}, {edu.location.country}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWithReveal>
      </div>
    </section>
  );
}
