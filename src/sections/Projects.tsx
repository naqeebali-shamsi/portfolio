import React from 'react';
import SectionLabel from '@/components/atoms/SectionLabel';
import TechStackGrid from '@/components/molecules/TechStackGrid';
import ExternalLinkGroup from '@/components/molecules/ExternalLinkGroup';
import VideoLightbox from '@/components/VideoLightbox';
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
  const [flipped, setFlipped] = React.useState(false);
  const [demoOpen, setDemoOpen] = React.useState(false);

  // Flip on card click/keypress — but never when the interaction targets a link
  // or a control opted out via [data-no-flip] (e.g. the "Watch demo" button).
  const toggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('a, [data-no-flip]')) return;
    setFlipped((f) => !f);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(e);
    }
  };

  return (
    <div
      className={`project-flip${flipped ? ' is-flipped' : ''}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${project.name}: ${flipped ? 'show summary' : 'show more detail'}`}
    >
      <div className="project-flip__inner">
        {/* Front — compact summary */}
        <div className="project-card project-card--tier2 project-flip__face project-flip__front">
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

          {project.links.length > 0 && (
            <ExternalLinkGroup
              links={project.links}
              arrow="↗"
              className="project-card__links project-card__links--compact"
              linkClassName="project-link"
            />
          )}
          {project.video && (
            <button
              type="button"
              data-no-flip
              className="project-demo-btn"
              aria-haspopup="dialog"
              onClick={(e) => {
                e.stopPropagation();
                setDemoOpen(true);
              }}
            >
              ▶ Watch demo
            </button>
          )}
          <span className="project-flip__hint" aria-hidden="true">↻ details</span>
        </div>

        {/* Back — fuller detail + full tech stack */}
        <div className="project-card project-card--tier2 project-flip__face project-flip__back">
          <div className="project-card--tier2__top">
            <span className="project-card__name--compact">{project.name}</span>
            <StatusBadge status={project.status} />
          </div>
          <p className="project-card__description--full">
            {project.details ?? project.description}
          </p>
          <TechStackGrid
            technologies={project.techStack}
            variant="css"
            gap="sm"
            className="project-card__tech"
          />
          <span className="project-flip__hint" aria-hidden="true">↺ back</span>
        </div>
      </div>
      {project.video && (
        <VideoLightbox
          open={demoOpen}
          src={project.video}
          poster={project.videoPoster}
          title={`${project.name} demo`}
          onClose={() => setDemoOpen(false)}
        />
      )}
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
