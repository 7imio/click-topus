import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DiceD20, { DiceD20Handle } from './DiceD20';
import { OrbitControls } from '@react-three/drei';

interface DiceRollerProps {
  diceColor: string;
}
export default function DiceRoller({ diceColor }) {
  const diceRef = useRef<DiceD20Handle>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleRoll = () => {
    const result = Math.ceil(Math.random() * 20);
    diceRef.current?.roll();
    setLastResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white gap-6">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <DiceD20 ref={diceRef} />
        <OrbitControls />
      </Canvas>

      <button
        onClick={handleRoll}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg text-xl"
      >
        🎲 Roll D20
      </button>
      {lastResult !== null && (
        <div className="text-4xl font-bold">Result: {lastResult}</div>
      )}
    </div>
  );
}
