import React, { Suspense } from 'react';
import { HeroText } from './HeroText';
import { HeroCSSFallback } from './HeroCSSFallback';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

const HeroScene = React.lazy(() => import('./HeroScene'));

export function Hero() {
  const { canRender3D } = useDeviceCapability();

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex items-center px-8 max-w-container mx-auto"
    >
      <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16 py-16">
        {/* Left — Text content */}
        <div className="flex-1 w-full">
          <HeroText />
        </div>

        {/* Right — 3D element or CSS fallback */}
        <div className="flex-1 w-full hidden lg:flex items-center justify-center">
          {canRender3D ? (
            <Suspense fallback={<HeroCSSFallback />}>
              <HeroScene />
            </Suspense>
          ) : (
            <HeroCSSFallback />
          )}
        </div>
      </div>
    </section>
  );
}
