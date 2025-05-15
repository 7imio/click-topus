import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useDynamicWorldTexture } from './texture/WorldMapTexture';
import * as THREE from 'three';
import { useRef } from 'react';

// 👉 Ce composant sera MONTÉ dans le contexte du Canvas, donc safe pour les hooks R3F
const GlobeMesh = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  const texture = useDynamicWorldTexture();
  useFrame(() => {
    if (globeRef.current && texture) {
      globeRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial
          color={'#24684d'}
          side={THREE.BackSide}
          transparent={true}
          opacity={1} // Rend l’atmosphère plus légère
          depthWrite={false} // Ne masque pas la planète
          blending={THREE.AdditiveBlending} // Effet lumineux subtil
        />
      </mesh>
      {/* Globe */}
      {texture && (
        <mesh ref={globeRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={texture || undefined}
            color={!texture ? '#444' : undefined}
          />
        </mesh>
      )}
    </>
  );
};

const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 5]} />

      <GlobeMesh />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={5}
        saturation={4}
        speed={1}
        fade
      />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default Globe;
