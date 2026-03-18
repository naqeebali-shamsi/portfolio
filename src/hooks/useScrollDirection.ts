import { useEffect, useRef, useState } from 'react';

interface ScrollDirection {
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
}

const THRESHOLD = 10;

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      setIsAtTop(scrollY < THRESHOLD);

      const diff = scrollY - lastScrollY.current;

      if (Math.abs(diff) >= THRESHOLD) {
        setDirection(diff > 0 ? 'down' : 'up');
        lastScrollY.current = scrollY;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { direction, isAtTop };
}
