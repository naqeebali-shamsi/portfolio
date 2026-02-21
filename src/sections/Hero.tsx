import React from 'react';
import { TubesBackground } from '../components/ui/neon-flow';
import TerminalText from '../components/TerminalText';
import './Hero.css';

interface HeroProps {
  greeting: {
    username: string;
    title: string;
    subTitle: string;
    resumeLink: string;
  };
}

const Hero: React.FC<HeroProps> = ({ greeting }) => {
  return (
    <section id="home" className="hero-section">
      <TubesBackground className="hero-background">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-greeting">
              <TerminalText text={greeting.title} delay={50} prefix="naqee@portfolio:~$ " />
            </h2>
            <h1 className="hero-name">
              <TerminalText text={greeting.username} delay={100} />
            </h1>
            <p className="hero-subtitle">
              {greeting.subTitle}
            </p>
            
            <div className="hero-actions pointer-events-auto">
              <a href="#projects" className="cta-button primary">
                {">"} VIEW PROJECTS
              </a>
              {greeting.resumeLink && (
                <a href={greeting.resumeLink} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  {">"} GET IN TOUCH
                </a>
              )}
            </div>
          </div>
        </div>
      </TubesBackground>
    </section>
  );
};

export default Hero;
