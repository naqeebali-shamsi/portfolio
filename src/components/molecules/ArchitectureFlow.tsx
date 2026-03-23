import './ArchitectureFlow.css';

interface ArchitectureFlowNode {
  label: string;
  sublabel?: string;
  accent?: boolean;
  /** Indices of child nodes for branching layout */
  children?: number[];
}

interface ArchitectureFlowConnection {
  from: number;
  to: number;
  label?: string;
}

interface ArchitectureFlowProps {
  nodes: ArchitectureFlowNode[];
  connections?: ArchitectureFlowConnection[];
  layout?: 'vertical' | 'horizontal' | 'branching';
  className?: string;
}

/* ---- Internal sub-components ---- */

function ArchBox({
  label,
  sublabel,
  accent,
}: {
  label: string;
  sublabel?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`architecture-flow__node${accent ? ' architecture-flow__node--accent' : ''}`}
    >
      <p className="architecture-flow__node-label">{label}</p>
      {sublabel && <p className="architecture-flow__node-sublabel">{sublabel}</p>}
    </div>
  );
}

function ArchArrow({ direction = 'vertical' }: { direction?: 'vertical' | 'horizontal' }) {
  const isVertical = direction === 'vertical';
  return (
    <div className={`architecture-flow__connector architecture-flow__connector--${direction}`}>
      <div className="architecture-flow__connector-line" />
      <span className="architecture-flow__connector-head">
        {isVertical ? '\u25BC' : '\u25B6'}
      </span>
    </div>
  );
}

/* ---- Main component ---- */

/**
 * Reusable architecture flow diagram molecule.
 *
 * Renders a sequence of labelled boxes connected by arrows. Supports vertical,
 * horizontal, and branching layouts.
 *
 * Usage:
 *   <ArchitectureFlow
 *     nodes={[
 *       { label: 'Client', sublabel: 'React + TypeScript' },
 *       { label: 'API Gateway', sublabel: 'Go + gRPC', accent: true },
 *       { label: 'Database', sublabel: 'PostgreSQL' },
 *     ]}
 *     layout="vertical"
 *   />
 *
 * For branching, specify `children` on a node to split into multiple branches:
 *   <ArchitectureFlow
 *     nodes={[
 *       { label: 'API', children: [1, 2] },
 *       { label: 'DB', sublabel: 'PostgreSQL' },
 *       { label: 'WS', sublabel: 'Real-time' },
 *     ]}
 *     layout="branching"
 *   />
 */
export default function ArchitectureFlow({
  nodes,
  connections: _connections,
  layout = 'vertical',
  className,
}: ArchitectureFlowProps) {
  const direction = layout === 'horizontal' ? 'horizontal' : 'vertical';

  const rootClass = [
    'architecture-flow',
    `architecture-flow--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (layout === 'branching') {
    return <BranchingLayout nodes={nodes} className={rootClass} />;
  }

  // Linear layout (vertical or horizontal)
  return (
    <div className={rootClass}>
      {nodes.map((node, i) => (
        <div key={i} className="contents">
          {i > 0 && <ArchArrow direction={direction} />}
          <ArchBox label={node.label} sublabel={node.sublabel} accent={node.accent} />
        </div>
      ))}
    </div>
  );
}

/* ---- Branching layout ---- */

function BranchingLayout({
  nodes,
  className,
}: {
  nodes: ArchitectureFlowNode[];
  className: string;
}) {
  // Walk the tree starting from node 0.
  // Nodes with `children` produce a branch row; nodes without are simple leaves.
  function renderNode(index: number): React.ReactNode {
    const node = nodes[index];
    if (!node) return null;

    const childIndices = node.children;

    return (
      <div key={index} className="contents">
        <ArchBox label={node.label} sublabel={node.sublabel} accent={node.accent} />

        {childIndices && childIndices.length > 0 && (
          <>
            <div className="architecture-flow__branch-row">
              {childIndices.map((childIdx) => (
                <div key={childIdx} className="architecture-flow__branch-col">
                  <ArchArrow direction="vertical" />
                  {renderNode(childIdx)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Find root nodes: those not referenced as children of any other node
  const childSet = new Set(nodes.flatMap((n) => n.children ?? []));
  const roots = nodes
    .map((_, i) => i)
    .filter((i) => !childSet.has(i));

  return (
    <div className={className}>
      {roots.map((rootIdx, i) => (
        <div key={rootIdx} className="contents">
          {i > 0 && <ArchArrow direction="vertical" />}
          {renderNode(rootIdx)}
        </div>
      ))}
    </div>
  );
}
