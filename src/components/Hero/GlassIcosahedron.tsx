import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GlassIcosahedronProps {
  mouse: React.RefObject<{ x: number; y: number }>;
}

export function GlassIcosahedron({ mouse }: GlassIcosahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;

    // Gentle cursor follow — lerp toward mouse-derived target rotation
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mx * 0.3,
      0.03,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      my * 0.3,
      0.03,
    );

    // Ambient rotation — always slowly spinning so it's never static
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 0]} />
      <MeshTransmissionMaterial
        color="#70ABAF"
        transmission={0.95}
        roughness={0.1}
        thickness={0.5}
        chromaticAberration={0.03}
        resolution={256}
        samples={6}
        backside={false}
      />
    </mesh>
  );
}
