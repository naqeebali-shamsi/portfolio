import { HeroText } from './HeroText';
import { HeroCSSFallback } from './HeroCSSFallback';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export function Hero() {
  // Store capability for Plan 02 (3D element conditional rendering)
  const { canRender3D: _canRender3D } = useDeviceCapability();

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
          <HeroCSSFallback />
        </div>
      </div>
    </section>
  );
}
