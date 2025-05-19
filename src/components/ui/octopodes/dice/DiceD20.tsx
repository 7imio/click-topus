import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export type DiceD20Handle = {
  roll: () => void;
};

interface DiceD20Props {
  color?: string;
  textColor?: string;
  onResult?: (result: number) => void;
  resultDelay?: number; // ⏱️ Temps en ms avant de retourner le résultat
}

const DiceD20 = forwardRef<DiceD20Handle, DiceD20Props>(
  (
    { color = '#004d40', textColor = '#ffffff', onResult, resultDelay = 500 },
    ref
  ) => {
    const groupRef = useRef<THREE.Group>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [targetRotation, setTargetRotation] = useState<THREE.Euler | null>(
      null
    );

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const positions = geometry.getAttribute('position');
    const faceCenters: THREE.Vector3[] = [];
    const faceNormals: THREE.Vector3[] = [];

    for (let i = 0; i < positions.count; i += 3) {
      const a = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );
      const b = new THREE.Vector3(
        positions.getX(i + 1),
        positions.getY(i + 1),
        positions.getZ(i + 1)
      );
      const c = new THREE.Vector3(
        positions.getX(i + 2),
        positions.getY(i + 2),
        positions.getZ(i + 2)
      );

      const center = new THREE.Vector3()
        .addVectors(a, b)
        .add(c)
        .divideScalar(3)
        .normalize()
        .multiplyScalar(0.8);
      faceCenters.push(center);

      const normal = new THREE.Vector3()
        .crossVectors(
          new THREE.Vector3().subVectors(b, a),
          new THREE.Vector3().subVectors(c, a)
        )
        .normalize();
      faceNormals.push(normal);
    }

    useImperativeHandle(ref, () => ({
      roll() {
        if (groupRef.current) {
          setIsRolling(true);
          setTargetRotation(null);

          const randomX = Math.random() * Math.PI * 8;
          const randomY = Math.random() * Math.PI * 8;
          const randomZ = Math.random() * Math.PI * 8;
          groupRef.current.rotation.set(randomX, randomY, randomZ);

          const resultFace = Math.floor(Math.random() * 20);
          const normal = faceNormals[resultFace];

          const targetQuat = new THREE.Quaternion().setFromUnitVectors(
            normal,
            new THREE.Vector3(0, 0, -1)
          );
          const targetEuler = new THREE.Euler().setFromQuaternion(targetQuat);

          setTimeout(() => {
            setIsRolling(false);
            setTargetRotation(targetEuler);

            // ✅ Appel du résultat UNIQUEMENT après le délai
            setTimeout(() => {
              onResult?.(resultFace + 1);
            }, resultDelay);
          }, 1000);
        }
      },
    }));

    useFrame(() => {
      if (groupRef.current) {
        if (isRolling) {
          groupRef.current.rotation.x += 0.5;
          groupRef.current.rotation.y += 0.5;
        } else if (targetRotation) {
          groupRef.current.rotation.x +=
            (targetRotation.x - groupRef.current.rotation.x) * 0.1;
          groupRef.current.rotation.y +=
            (targetRotation.y - groupRef.current.rotation.y) * 0.1;
          groupRef.current.rotation.z +=
            (targetRotation.z - groupRef.current.rotation.z) * 0.1;
        }
      }
    });

    return (
      <group ref={groupRef}>
        <mesh geometry={geometry}>
          <meshStandardMaterial color={color} />
        </mesh>

        {faceCenters.map((center, i) => {
          const normal = faceNormals[i];
          const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            normal
          );
          const targetEuler = new THREE.Euler().setFromQuaternion(
            targetQuaternion
          );

          return (
            <Text
              key={i}
              position={center}
              fontSize={0.35}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              rotation={targetEuler}
            >
              {i + 1}
            </Text>
          );
        })}
      </group>
    );
  }
);

export default DiceD20;
