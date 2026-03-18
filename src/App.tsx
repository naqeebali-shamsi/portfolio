import { Navbar } from '@/components/Navbar/Navbar';
import { HowIBuild } from '@/sections/HowIBuild';
import { CaseStudy } from '@/sections/CaseStudy';
import { Experience } from '@/sections/Experience';
import { Contact } from '@/sections/Contact';

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
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
