import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Background from './components/Background';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Journey from './sections/Journey';
import Achievements from './sections/Achievements';
import Blogs from './sections/Blogs';
import Figma from './sections/Figma';
import Contact from './sections/Contact';
import * as portfolioData from './assets/data/portfolio';
import './styles/index.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      <Background />
      <header>
        <Navbar />
      </header>

      <main>
        <Hero greeting={portfolioData.greeting} />
        <About
          education={portfolioData.educationInfo}
          work={portfolioData.workExperiences}
          stats={portfolioData.techStack.experience}
          skills={portfolioData.skillsSection}
        />
        <Journey />
        <Projects projects={portfolioData.bigProjects.projects} />
        <Achievements achievementData={portfolioData.achievementSection} />
        <Blogs blogData={portfolioData.blogSection} />
        <Figma figmaData={portfolioData.figmaSection} />
        <Contact
          contactInfo={portfolioData.contactInfo}
          socialLinks={portfolioData.socialMediaLinks}
        />
      </main>

      <footer style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        <p>{'>'} ns. &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
