import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import DiceD20 from './DiceD20';

export default function DiceRoller() {
  const [targetFace, setTargetFace] = useState<number | null>(null);

  const lancerDe = () => {
    const result = Math.floor(Math.random() * 20) + 1;
    setTargetFace(result);
  };

  const handleRollEnd = () => {
    setTargetFace(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={lancerDe}
        className="bg-emerald-700 hover:bg-emerald-600 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300"
      >
        🎲 Roll the D20
      </button>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: '300px', height: '300px' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <DiceD20 targetFace={targetFace} onRollEnd={handleRollEnd} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
