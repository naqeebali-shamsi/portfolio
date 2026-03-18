import { Navbar } from '@/components/Navbar/Navbar';
import { HowIBuild } from '@/sections/HowIBuild';
import { CaseStudy } from '@/sections/CaseStudy';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main>
        <section className="pt-16 py-section px-8 max-w-container mx-auto">
          <h1 className="font-heading text-display uppercase tracking-heading font-bold">
            NAQEEBALI SHAMSI
          </h1>
          <p className="font-body text-base text-text-muted mt-6">
            Full Stack Engineer building premium experiences.
          </p>
        </section>
        <HowIBuild />
        <CaseStudy />
        <section id="experience" className="bg-bg-feature py-section px-8">
          <div className="max-w-container mx-auto">
            <h2 className="font-heading text-5xl uppercase tracking-heading font-bold">
              EXPERIENCE
            </h2>
          </div>
        </section>
        <section id="contact" className="py-section px-8 max-w-container mx-auto">
          <h2 className="font-heading text-5xl uppercase tracking-heading font-bold text-accent">
            CONTACT
          </h2>
        </section>
      </main>
    </div>
  );
}
