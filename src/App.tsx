import { useEffect } from 'react';
import '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { Skills } from '@/sections/Skills';
import { Experience } from '@/sections/Experience';
import { CaseStudy } from '@/sections/CaseStudy';
import { HowIBuild } from '@/sections/HowIBuild';
import Projects from '@/sections/Projects';
import Blogs from '@/sections/Blogs';
import { Contact } from '@/sections/Contact';
import { blogSection } from '@/assets/data/portfolio';

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
        <Skills />
        <Experience />
        <CaseStudy />
        <HowIBuild />
        <Projects />
        <Blogs blogData={blogSection} />
        <Contact />
      </main>
      <footer className="text-center text-sm text-stone-400 py-4">
        &copy; 2026 Naqeebali Shamsi
      </footer>
    </div>
  );
}
