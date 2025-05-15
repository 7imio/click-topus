// Globe.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useDynamicWorldTexture } from './texture/WorldMapTexture';
import * as THREE from 'three';

const Globe = () => {
  const texture = useDynamicWorldTexture();

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial color={'#24684d'} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          map-offset={[0, 0]}
          map-repeat={[1, 1]}
        />
      </mesh>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={15}
        saturation={15}
        speed={1}
        fade
      />
      <OrbitControls enablePan={true} enableZoom={true} />
    </Canvas>
  );
};

export default Globe;
