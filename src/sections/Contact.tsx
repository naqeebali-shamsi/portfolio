import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { contactInfo } from '@/data/content';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { SocialLinks } from '@/components/SocialLinks';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { copied, copy } = useCopyToClipboard();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const content = sectionRef.current?.querySelector('[data-reveal="contact"]');

        if (content) {
          gsap.set(content, { opacity: 0, y: 40 });
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
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
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center py-section px-8 scroll-mt-20"
    >
      <div data-reveal="contact" className="flex flex-col items-center">
        <p className="font-heading text-sm uppercase tracking-wide text-text-muted mb-8">
          GET IN TOUCH
        </p>

        <button
          type="button"
          onClick={() => copy(contactInfo.email)}
          className={`font-heading text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-colors cursor-pointer ${
            copied ? 'text-accent' : 'text-text hover:text-accent'
          }`}
        >
          {copied ? 'Copied!' : contactInfo.email}
        </button>

        <p className="text-sm text-text-muted mt-2">
          {copied ? 'Copied to clipboard' : 'Click to copy'}
        </p>

        <div className="mt-12">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
