import TechTag from '@/components/atoms/TechTag';
import './TechStackGrid.css';

interface TechStackGridProps {
  technologies: string[];
  /** Styling variant passed through to each TechTag */
  variant?: 'css' | 'tw';
  /** Gap between tags */
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  /** If set, only show this many tags + a "+X more" indicator */
  maxVisible?: number;
}

export default function TechStackGrid({
  technologies,
  variant = 'css',
  gap = 'sm',
  className,
  maxVisible,
}: TechStackGridProps) {
  const visibleTechs =
    maxVisible != null && technologies.length > maxVisible
      ? technologies.slice(0, maxVisible)
      : technologies;

  const overflowCount =
    maxVisible != null ? technologies.length - visibleTechs.length : 0;

  return (
    <div
      className={`tech-stack-grid tech-stack-grid--gap-${gap}${className ? ` ${className}` : ''}`}
    >
      {visibleTechs.map((tech) => (
        <TechTag key={tech} variant={variant}>
          {tech}
        </TechTag>
      ))}
      {overflowCount > 0 && (
        <span className="tech-stack-grid__overflow">+{overflowCount} more</span>
      )}
    </div>
  );
}
