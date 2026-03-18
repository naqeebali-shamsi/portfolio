import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { GlassIcosahedron } from './GlassIcosahedron';

export default function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Track mouse position normalized to -1..1 over the wrapper
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  // IntersectionObserver — unmount Canvas when hero scrolls out of view (disposes WebGL)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handlePointerMove}
      className="w-full h-full min-h-[300px]"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="studio" environmentIntensity={0.5} />
          <GlassIcosahedron mouse={mouseRef} />
        </Canvas>
      )}
    </div>
  );
}
