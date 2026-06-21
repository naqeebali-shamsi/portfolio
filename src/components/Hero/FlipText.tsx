import { useEffect, useRef, useState } from 'react';

interface FlipTextProps {
  text: string;
  className?: string;
  /** Delay before the flip sequence starts (ms) */
  delay?: number;
  /** Stagger between each character flip (ms) */
  stagger?: number;
  /** Duration of each character's flip (ms) */
  duration?: number;
}

/**
 * Each character flips in from behind (rotateX) with a stagger,
 * like cards flipping over to reveal the name.
 */
export default function FlipText({
  text,
  className = '',
  delay = 200,
  stagger = 40,
  duration = 600,
}: FlipTextProps) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Split into lines by <br/> markers, then chars
  const lines = text.split('\n');
  let charIndex = 0;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block" style={{ perspective: '1000px' }}>
          {line.split('').map((char) => {
            const idx = charIndex++;
            const charDelay = idx * stagger;
            return (
              <span
                key={`${lineIdx}-${idx}`}
                className="inline-block"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: started
                    ? `flipIn ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${charDelay}ms both`
                    : 'none',
                  opacity: started ? undefined : 0,
                }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}

      <style>{`
        @keyframes flipIn {
          0% {
            opacity: 0;
            transform: rotateX(-90deg) translateY(20px);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0);
          }
        }
      `}</style>
    </span>
  );
}
