import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Instances, Instance, type PositionMesh } from '@react-three/drei';
import * as THREE from 'three';

const GRID = 50;
const SPACING = 0.4;
const INFLUENCE_RADIUS = 3;

export default function MagneticGrid3D() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const pos: [number, number][] = [];
    const offset = (GRID * SPACING) / 2;
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        pos.push([x * SPACING - offset, y * SPACING - offset]);
      }
    }
    return pos;
  }, []);

  useFrame(({ pointer }) => {
    mouse.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2
    );
  });

  return (
    <Instances limit={GRID * GRID}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshBasicMaterial color="#171219" />
      {positions.map(([x, y], i) => (
        <GridDot key={i} baseX={x} baseY={y} mouse={mouse} />
      ))}
    </Instances>
  );
}

const baseColor = new THREE.Color('#171219');
const activeColor = new THREE.Color('#63D2FF');
const tempColor = new THREE.Color();

interface GridDotProps {
  baseX: number;
  baseY: number;
  mouse: React.RefObject<THREE.Vector2>;
}

function GridDot({ baseX, baseY, mouse }: GridDotProps) {
  const ref = useRef<PositionMesh>(null);

  useFrame(() => {
    if (!ref.current || !mouse.current) return;
    const dx = baseX - mouse.current.x;
    const dy = baseY - mouse.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);

    // Z displacement
    ref.current.position.z = influence * 1.5;

    // Scale pulse
    const s = 1 + influence * 0.5;
    ref.current.scale.set(s, s, s);

    // Color lerp
    tempColor.copy(baseColor).lerp(activeColor, influence);
    ref.current.color.copy(tempColor);
  });

  return <Instance ref={ref} position={[baseX, baseY, 0]} color="#171219" />;
}
