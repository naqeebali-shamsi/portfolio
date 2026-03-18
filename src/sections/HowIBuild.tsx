import { howIBuildStatements } from '@/data/content';

export function HowIBuild() {
  return (
    <section id="how-i-build" className="bg-bg-feature py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-8">
        <div className="space-y-16 md:space-y-24">
          {howIBuildStatements.map((statement, index) => (
            <p
              key={index}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text max-w-4xl"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
