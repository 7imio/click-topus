import { useRef, FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DiceD20, { DiceD20Handle } from './DiceD20';
import { OrbitControls } from '@react-three/drei';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { updateCreature } from '../../../../store/slices/creatureSlice';
import { buyCorruptionItem } from '../../../../store/slices/corruptionSlice';
import { rollEffect } from '../../../../helpers/math-utils';
import { Creature } from '../../../../types/Creature';

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
  const essence = creature.essence;
  const [diceResult, setDiceResult] = useState<number>();
  const [isRolling, setIsRolling] = useState(false);
  const dispatch = useAppDispatch();

  const [delta, setDelta] = useState<number>();

  const canBuy = corruption >= currentCost;
  const diceRef = useRef<DiceD20Handle>(null);

  const handleRoll = () => {
    if (!canBuy || isRolling) return;
    setIsRolling(true);
    diceRef.current?.roll();
    dispatch(
      buyCorruptionItem({ name: `Competence for ${creature.creatureName}` })
    );
    setResult(null);
  };

  const handleSetCompetence = (result: number) => {
    setDiceResult(result);
    setIsRolling(false);
    const { creatureId } = creature;
    const newEssence = rollEffect(essence, result);
    setDelta(newEssence - creature.essence);
    const updatedCreature = { ...creature, essence: newEssence };
    dispatch(updateCreature({ creatureId, creature: updatedCreature }));
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
      <div className="text-xl text-center z-50 font-bold text-emerald-600 text-shadow-lg">
        <h2>Buy competence</h2>
        <p>Price : {currentCost} corruption</p>
      </div>
      <button
        onClick={handleRoll}
        disabled={!canBuy}
        className={`${canBuy ? 'bg-emerald-700 hover:bg-emerald-600 hover:scale-105 ' : 'bg-neutral-600'} m-4 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow z-[100]`}
        // className={`px-6 py-3 ${canBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600'} text-white rounded-xl shadow-lg text-xl`}
      >
        {canBuy ? '🎲 Roll Dice' : "You can't buy"}
      </button>
      <div className="text-xl h-15 font-bold text-green-600 text-shadow-md">
        {result !== null && !isRolling && (
          <>
            <p>Result: {diceResult}</p>
            <p>Delta : {delta}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
