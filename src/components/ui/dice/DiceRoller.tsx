import { useRef, FC } from 'react';
import { Canvas } from '@react-three/fiber';
import DiceD20, { DiceD20Handle } from './DiceD20';
import { OrbitControls } from '@react-three/drei';

export interface DiceRollerProps {
  diceColor: string;
  textColor: string;
  setResult: (result: number | null) => void;
  result: number | null;
}

export const DiceRoller: FC<DiceRollerProps> = ({
  diceColor,
  textColor,
  setResult,
  result,
}) => {
  const diceRef = useRef<DiceD20Handle>(null);

  const handleRoll = () => {
    diceRef.current?.roll(); // On ne récupère plus de résultat directement ici
    setResult(null); // On réinitialise l'affichage du résultat
  };

  return (
    <div className="flex flex-col items-center justify-center text-white gap-6">
      <Canvas camera={{ position: [0, 0, -3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 20, 5]} intensity={3} />
        <DiceD20
          ref={diceRef}
          color={diceColor}
          textColor={textColor}
          onResult={(result) => setResult(result)}
          resultDelay={1000} // ⏱️ Délai en ms avant l'affichage du résultat
        />

        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      <button
        onClick={handleRoll}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg text-xl"
      >
        🎲 Roll D20
      </button>

      {result !== null && (
        <div className="absolute text-4xl font-bold text-shadow-black text-shadow-xs">
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
