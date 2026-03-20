import { useEffect } from 'react';
import '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { HowIBuild } from '@/sections/HowIBuild';
import { CaseStudy } from '@/sections/CaseStudy';
import { Experience } from '@/sections/Experience';
import { Contact } from '@/sections/Contact';

export default function App() {
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <CustomCursor />
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
