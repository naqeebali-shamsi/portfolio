import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cursorRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop:
          '(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)',
        desktopReduced:
          '(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop } = context.conditions!;
        const morphDuration = desktop ? 0.2 : 0;
        const morphEase = desktop ? 'back.out(2)' : 'none';

        // Show cursor and hide system cursor
        gsap.set(el, { autoAlpha: 0.5 });
        document.documentElement.classList.add('custom-cursor-active');

        // Instant position tracking via quickSetter (no lerp, no re-renders)
        const xSet = gsap.quickSetter(el, 'x', 'px');
        const ySet = gsap.quickSetter(el, 'y', 'px');

        let currentMorph: string | null = null;

        function morphTo(type: string | null) {
          if (type === currentMorph) return;
          currentMorph = type;

          switch (type) {
            case 'link':
              gsap.to(el, {
                width: 48,
                height: 48,
                borderWidth: 1.5,
                backgroundColor: 'rgba(255,250,255,0.15)',
                opacity: 1,
                duration: morphDuration,
                ease: morphEase,
              });
              break;
            case 'project':
              gsap.to(el, {
                width: 80,
                height: 80,
                borderWidth: 1,
                backgroundColor: 'transparent',
                opacity: 1,
                duration: morphDuration,
                ease: morphEase,
              });
              break;
            case 'text':
              gsap.to(el, {
                width: 18,
                height: 18,
                borderWidth: 1.5,
                backgroundColor: 'transparent',
                opacity: 0.6,
                duration: morphDuration,
                ease: morphEase,
              });
              break;
            default:
              gsap.to(el, {
                width: 24,
                height: 24,
                borderWidth: 1.5,
                backgroundColor: 'transparent',
                opacity: 0.5,
                duration: morphDuration,
                ease: morphEase,
              });
              break;
          }
        }

        // --- Event handlers ---

        function onMouseMove(e: MouseEvent) {
          xSet(e.clientX);
          ySet(e.clientY);
        }

        function onMouseOver(e: MouseEvent) {
          const target = (e.target as HTMLElement).closest('[data-cursor]');
          morphTo(target ? target.getAttribute('data-cursor') : null);
        }

        function onMouseDown() {
          gsap.to(el, { scale: 0.8, duration: 0.1, ease: 'power2.in' });
        }

        function onMouseUp() {
          gsap.to(el, { scale: 1, duration: 0.25, ease: 'back.out(3)' });
        }

        function onWindowLeave() {
          gsap.to(el, { autoAlpha: 0, duration: 0.15 });
        }

        function onWindowEnter() {
          gsap.to(el, { autoAlpha: 0.5, duration: 0.15 });
        }

        // Attach listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseleave', onWindowLeave);
        document.documentElement.addEventListener('mouseenter', onWindowEnter);

        // Cleanup on context revert (media query no longer matches)
        return () => {
          document.documentElement.classList.remove('custom-cursor-active');
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseover', onMouseOver);
          document.removeEventListener('mousedown', onMouseDown);
          document.removeEventListener('mouseup', onMouseUp);
          document.documentElement.removeEventListener(
            'mouseleave',
            onWindowLeave,
          );
          document.documentElement.removeEventListener(
            'mouseenter',
            onWindowEnter,
          );
        };
      },
    );
  });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-current mix-blend-difference"
      style={{
        width: 24,
        height: 24,
        visibility: 'hidden',
        color: '#FFFAFF',
      }}
    />
  );
}
