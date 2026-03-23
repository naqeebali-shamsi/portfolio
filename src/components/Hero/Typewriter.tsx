import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface TypewriterProps {
  titles: readonly string[];
}

export function Typewriter({ titles }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useEffect(() => {
    if (titles.length === 0) return;

    const ctx = gsap.context(() => {
      let currentIndex = 0;

      function animateTitle() {
        const title = titles[currentIndex];
        const obj = { index: 0 };

        const tl = gsap.timeline({
          onComplete: () => {
            currentIndex = (currentIndex + 1) % titles.length;
            animateTitle();
          },
        });

        // Type forward
        tl.to(obj, {
          index: title.length,
          duration: title.length * 0.06,
          ease: 'none',
          onUpdate: () => {
            setDisplayText(title.substring(0, Math.round(obj.index)));
          },
        });

        // Pause after typing
        tl.to({}, { duration: 1.2 });

        // Delete backward
        tl.to(obj, {
          index: 0,
          duration: title.length * 0.035,
          ease: 'none',
          onUpdate: () => {
            setDisplayText(title.substring(0, Math.round(obj.index)));
          },
        });

        // Pause before next title
        tl.to({}, { duration: 0.3 });
      }

      animateTitle();
    });

    ctxRef.current = ctx;
    return () => ctx.revert();
  }, [titles]);

  return (
    <span className="text-2xl md:text-3xl text-accent font-heading inline-flex items-center">
      <span>{displayText}</span>
      <span
        className="ml-0.5 inline-block w-[2px] h-[1em] bg-accent animate-blink"
        aria-hidden="true"
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </span>
  );
}
