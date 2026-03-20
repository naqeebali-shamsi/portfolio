import { heroTitles, heroTagline } from '@/data/content';
import { Typewriter } from './Typewriter';

export function HeroText() {
  return (
    <div className="flex flex-col justify-center pb-8 lg:pb-0">
      <h1 className="font-heading text-display uppercase tracking-heading font-bold leading-[0.95]">
        Naqeebali
        <br />
        Shamsi
      </h1>
      <div className="mt-6 h-10">
        <Typewriter titles={heroTitles} />
      </div>
      <p className="font-body text-lg text-text-muted mt-6">
        {heroTagline}
      </p>
    </div>
  );
}
