import { useRef, useState, FC } from 'react';
import { Canvas } from '@react-three/fiber';
import DiceD20, { DiceD20Handle } from './DiceD20';
import { OrbitControls } from '@react-three/drei';

export interface DiceRollerProps {
  diceColor: string;
  textColor: string;
}

export const DiceRoller: FC<DiceRollerProps> = ({ diceColor, textColor }) => {
  const diceRef = useRef<DiceD20Handle>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleRoll = () => {
    const result = diceRef.current?.roll();
    if (result !== undefined) setLastResult(null); // Réinitialise le résultat pendant l'animation
  };

  return (
    <div className="flex flex-col items-center justify-center text-white gap-6">
      <Canvas camera={{ position: [0, 0, -3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 20, 5]} intensity={3} />
        <DiceD20
          ref={diceRef}
          color={diceColor ?? '#004d40'}
          textColor={textColor ?? '#ffffff'}
          onResult={(result) => setLastResult(result)}
        />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      <button
        onClick={handleRoll}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg text-xl"
      >
        🎲 Roll D20
      </button>

      {lastResult !== null && (
        <div className="absolute text-4xl font-bold text-shadow-black text-shadow-xs">
          Result: {lastResult}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
