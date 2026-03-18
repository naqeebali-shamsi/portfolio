import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { HowIBuild } from '@/sections/HowIBuild';
import { CaseStudy } from '@/sections/CaseStudy';
import { Experience } from '@/sections/Experience';
import { Contact } from '@/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main>
        <Hero />
        <HowIBuild />
        <CaseStudy />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
