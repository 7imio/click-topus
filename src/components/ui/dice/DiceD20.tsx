import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

const geometry = new THREE.IcosahedronGeometry(2, 0);
const normalAttr = geometry.getAttribute('normal');
const faceNormals: THREE.Vector3[] = [];
for (let i = 0; i < normalAttr.count; i += 3) {
  const nx = normalAttr.getX(i);
  const ny = normalAttr.getY(i);
  const nz = normalAttr.getZ(i);
  faceNormals.push(new THREE.Vector3(nx, ny, nz).normalize());
}

interface DiceProps {
  targetFace: number | null;
  onRollEnd: () => void;
}

export default function DiceD20({ targetFace, onRollEnd }: DiceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (targetFace !== null) {
      meshRef.current.rotation.x += Math.random() * 10 * delta;
      meshRef.current.rotation.y += Math.random() * 10 * delta;
      meshRef.current.rotation.z += Math.random() * 10 * delta;

      elapsed.current += delta;
      if (elapsed.current >= 2) {
        const targetNormal = faceNormals[targetFace - 1];
        const targetQuat = new THREE.Quaternion().setFromUnitVectors(
          targetNormal,
          new THREE.Vector3(0, 0, 1)
        );
        meshRef.current.quaternion.copy(targetQuat);
        elapsed.current = 0;
        onRollEnd();
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="#10b981" flatShading />
      {faceNormals.map((normal, i) => (
        <Text
          key={i}
          position={normal.clone().multiplyScalar(2.3)}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {i + 1}
        </Text>
      ))}
    </mesh>
  );
}
