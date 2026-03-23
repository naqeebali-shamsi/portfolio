import { heroTagline } from '@/data/content';

export function HeroText() {
  return (
    <div className="flex flex-col items-center justify-center pb-8 lg:pb-0">
      <h1 className="font-heading text-display uppercase tracking-heading font-bold leading-[0.95] text-center">
        Naqeebali
        <br />
        Shamsi
      </h1>
      <p className="font-body text-lg text-text-muted mt-6 text-center max-w-md">
        {heroTagline}
      </p>
    </div>
  );
}
