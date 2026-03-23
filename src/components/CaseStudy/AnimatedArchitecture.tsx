import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Smartphone,
  Zap,
  Database,
  CircleDot,
  Radio,
  Cloud,
} from 'lucide-react';
import './AnimatedArchitecture.css';

interface NodeDef {
  id: string;
  label: string;
  sublabel: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: boolean;
  x: number;
  y: number;
}

const nodes: NodeDef[] = [
  { id: 'rn',    label: 'React Native', sublabel: 'Mobile Client',    Icon: Smartphone, x: 50, y: 6 },
  { id: 'go',    label: 'Go API Server', sublabel: 'REST + WS',       Icon: Zap,        x: 50, y: 28, accent: true },
  { id: 'pg',    label: 'PostgreSQL',    sublabel: 'Relational Data',  Icon: Database,   x: 16, y: 58 },
  { id: 'redis', label: 'Redis',         sublabel: 'Cache + Pub/Sub',  Icon: CircleDot,  x: 50, y: 58 },
  { id: 'ws',    label: 'WebSockets',    sublabel: 'Real-time Sync',   Icon: Radio,      x: 84, y: 58 },
  { id: 's3',    label: 'AWS S3',        sublabel: 'Object Storage',   Icon: Cloud,      x: 50, y: 86 },
];

const connections: [string, string][] = [
  ['rn', 'go'],
  ['go', 'pg'],
  ['go', 'redis'],
  ['go', 'ws'],
  ['redis', 's3'],
];

const nodeVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/**
 * Pure-DOM approach: render nodes with CSS %, then measure their actual
 * pixel positions with getBoundingClientRect to draw SVG lines that
 * perfectly connect node centers.
 */
export default function AnimatedArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Measure node positions after render and on resize
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      setContainerSize({ w: rect.width, h: rect.height });

      const newLines = connections.map(([fromId, toId]) => {
        const fromEl = nodeRefs.current[fromId];
        const toEl = nodeRefs.current[toId];
        if (!fromEl || !toEl) return { x1: 0, y1: 0, x2: 0, y2: 0 };

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        return {
          x1: fromRect.left + fromRect.width / 2 - rect.left,
          y1: fromRect.top + fromRect.height / 2 - rect.top,
          x2: toRect.left + toRect.width / 2 - rect.left,
          y2: toRect.top + toRect.height / 2 - rect.top,
        };
      });

      setLines(newLines);
    };

    // Measure after a tick so nodes are rendered
    const timer = setTimeout(measure, 100);
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="arch-container">
      {/* SVG lines — pixel coordinates from measured node positions */}
      {containerSize.w > 0 && (
        <svg
          className="arch-beams"
          width={containerSize.w}
          height={containerSize.h}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {lines.map((line, i) => (
            <line
              key={i}
              className="arch-beam"
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          ))}
        </svg>
      )}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          ref={(el) => { nodeRefs.current[node.id] = el; }}
          className={`arch-node${node.accent ? ' arch-node--accent' : ''}`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          variants={nodeVariants}
          custom={i}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <node.Icon size={16} className="arch-node__icon" />
          <span className="arch-node__label">{node.label}</span>
          <span className="arch-node__sublabel">{node.sublabel}</span>
        </motion.div>
      ))}
    </div>
  );
}
