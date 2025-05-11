import { useRef, FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DiceD20, { DiceD20Handle } from './DiceD20';
import { OrbitControls } from '@react-three/drei';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  Creature,
  updateCreature,
} from '../../../../store/slices/creatureSlice';
import { buyCorruptionItem } from '../../../../store/slices/corruptionSlice';
import { setEssence } from '../../../../store/slices/essenceSlice';
import { rollEffect } from '../../../../helpers/math-utils';

export interface DiceRollerProps {
  setResult: (result: number | null) => void;
  result: number | null;
  creature: Creature;
}

export const DiceRoller: FC<DiceRollerProps> = ({
  setResult,
  result,
  creature,
}) => {
  const { skin } = creature;
  const { corruption, currentCost } = useAppSelector(
    (state) => state.corruption
  );
  const { essence } = useAppSelector((state) => state.essence);
  const [diceResult, setDiceResult] = useState<number>();
  const dispatch = useAppDispatch();

  const canBuy = corruption >= currentCost;

  const diceRef = useRef<DiceD20Handle>(null);

  const handleRoll = () => {
    if (!canBuy) return;

    diceRef.current?.roll();
    dispatch(
      buyCorruptionItem({ name: `Competence for ${creature.creatureName}` })
    );
    setResult(null);
  };

  const handleSetCompetence = (result: number) => {
    setDiceResult(result);
    const { creatureId } = creature;
    const newEssence = rollEffect(essence, result);
    const updatedCreature = { ...creature, essence: newEssence };
    updateCreature({ creatureId, creature: updatedCreature });
    setResult(newEssence);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white gap-6">
      <Canvas camera={{ position: [0, 0, -3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 20, 5]} intensity={3} />
        <DiceD20
          ref={diceRef}
          color={skin.bodyColor}
          textColor={skin.eyeWhiteColor}
          onResult={(result) => handleSetCompetence(result)}
          resultDelay={1000} // ⏱️ Délai en ms avant l'affichage du résultat
        />

        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
      <h2>Buy competence</h2>
      {}
      <button
        onClick={handleRoll}
        disabled={!canBuy}
        className={`px-6 py-3 ${canBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600'} text-white rounded-xl shadow-lg text-xl`}
      >
        {canBuy ? '🎲 Roll D20' : "You can't buy"}
      </button>

      {result !== null && (
        <div className="absolute text-4xl font-bold text-shadow-black text-shadow-xs">
          Result: {diceResult}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
