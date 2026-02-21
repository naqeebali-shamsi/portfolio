import React from 'react';
import TerminalText from '../components/TerminalText';
import * as LucideIcons from 'lucide-react';
import './Projects.css';

interface ProjectLink {
    name: string;
    url: string;
}

interface Project {
    projectName: string;
    projectDesc: string;
    footerLink: ProjectLink[];
    status?: string;
    tag?: string;
    techStack?: string[];
    iconName?: keyof typeof LucideIcons;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        cardRef.current.style.setProperty('--x', `${x}px`);
        cardRef.current.style.setProperty('--y', `${y}px`);
    };

    const IconComponent = project.iconName ? LucideIcons[project.iconName] as React.ElementType : LucideIcons.Folder;

    return (
        <div
            ref={cardRef}
            className="project-card"
            onMouseMove={handleMouseMove}
        >
            <div className="project-card-header">
                <div className="header-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                </div>
                <div className="header-title">
                    <span className="folder-icon">
                        <IconComponent size={14} className="project-icon" />
                    </span>
                    <span className="project-id">{project.projectName.toLowerCase().replace(/\s+/g, '-').slice(0, 10)}</span>
                </div>
                {project.status && (
                    <div className="project-tag">
                        {project.status === 'Building' ? 'Building' : 'Iterating'}
                    </div>
                )}
            </div>
            
            <div className="project-card-body">
                <h3 className="project-name">{project.projectName}</h3>
                <p className="project-desc">{project.projectDesc}</p>
                <div className="project-links">
                    {project.footerLink.map((link, lIndex) => (
                        <a
                            key={lIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            {link.name}
                            <span className="link-arrow">↗</span>
                        </a>
                    ))}
                </div>
                {project.techStack && (
                    <div className="project-tech-stack">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    return (
        <section className="projects" id="projects">
            <div className="projects-cli-header">
                <span className="cli-path">cd</span> ../projects<span className="blinking-cursor">_</span>
            </div>

            <div className="projects-description">
                <span className="green">{'>'}</span> Featured projects showcasing full-stack development, cloud architecture, and open source contributions. Click any project to explore further.
            </div>

            <div className="projects-meta">
                total {projects.length}
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={{...project, status: index === 0 ? 'Building' : 'Iterating'}} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
