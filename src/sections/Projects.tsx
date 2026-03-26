import React from 'react';
import SectionLabel from '@/components/atoms/SectionLabel';
import TechStackGrid from '@/components/molecules/TechStackGrid';
import ExternalLinkGroup from '@/components/molecules/ExternalLinkGroup';
import { projects, type Project } from '@/data/content';
import './Projects.css';

const tier1 = projects.filter((p) => p.tier === 1);
const tier2 = projects.filter((p) => p.tier === 2);

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

const statusLabel: Record<NonNullable<Project['status']>, string> = {
  active: 'Active',
  shipped: 'Shipped',
  'in-progress': 'In Progress',
};

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  if (!status) return null;
  return (
    <span className={`project-status project-status--${status}`}>
      <span className="project-status__dot" />
      {statusLabel[status]}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Tier 1 card — full terminal aesthetic
// ---------------------------------------------------------------------------

const Tier1Card: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--x', `${e.clientX - left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - top}px`);
  };

  return (
    <div
      ref={cardRef}
      className="project-card project-card--tier1"
      onMouseMove={handleMouseMove}
    >
      <div className="project-card__header">
        <div className="header-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="project-card__slug">
          {project.name.toLowerCase().replace(/\s+/g, '-')}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__description">{project.description}</p>

        <TechStackGrid
          technologies={project.techStack}
          variant="css"
          gap="md"
          className="project-card__tech"
        />

        {project.links.length > 0 && (
          <ExternalLinkGroup
            links={project.links}
            arrow="↗"
            className="project-card__links"
            linkClassName="project-link"
          />
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tier 2 card — compact
// ---------------------------------------------------------------------------

const Tier2Card: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="project-card project-card--tier2">
      <div className="project-card--tier2__top">
        <span className="project-card__name--compact">{project.name}</span>
        <StatusBadge status={project.status} />
      </div>
      <p className="project-card__description--compact">{project.description}</p>
      <TechStackGrid
        technologies={project.techStack}
        variant="css"
        gap="sm"
        maxVisible={3}
        className="project-card__tech"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const Projects: React.FC = () => {
  return (
    <section className="section-dark" id="projects">
      <div className="projects">
        <SectionLabel className="projects-section-label">projects</SectionLabel>

        {/* Tier 1 — Featured */}
        <p className="projects-tier-label">Featured</p>
        <div className="projects-grid projects-grid--tier1">
          {tier1.map((project) => (
            <Tier1Card key={project.name} project={project} />
          ))}
        </div>

        {/* Tier 2 — More Projects */}
        <p className="projects-tier-label projects-tier-label--secondary">
          More Projects
        </p>
        <div className="projects-grid projects-grid--tier2">
          {tier2.map((project) => (
            <Tier2Card key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
