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
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        background={new THREE.Color('#FAFAF5')}
        color="#70ABAF"
        transmission={0.97}
        roughness={0.05}
        thickness={0.3}
        chromaticAberration={0.06}
        anisotropicBlur={0.3}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
        resolution={256}
        samples={6}
        backside
        backsideThickness={0.3}
      />
    </mesh>
  );
}
