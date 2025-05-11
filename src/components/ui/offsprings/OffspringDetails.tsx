import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import MiniCreature from '../../background/MiniCreature';
import { Creature } from '../../../store/slices/creatureSlice';
import DiceRoller from './dice/DiceRoller';
import { useState } from 'react';

const OffspringDetails = () => {
  const { creatureId } = useParams<{ creatureId: string }>();
  const [essenceResult, setEssenceResult] = useState<number | null>(null);

  const handleResult = (result: number | null) => {
    if (!result) return;
    console.log(result);
    setEssenceResult(result);
  };

  const creature: Creature | undefined = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === creatureId)
  );

  if (!creature) {
    return <p className="text-red-500">❌ Creature not found</p>;
  }

  return (
    <div className="h-screen p-6 text-green-200">
      <div className="w-full flex flex-col justify-center align-middle items-center">
        <h1 className="text-2xl font-bold mb-4">🧬 Octopode Detail</h1>
        <h2 className="text-xl font-bold mb-4">
          <strong>Name:</strong> {creature.creatureName ?? 'Unnamed'}
        </h2>
        <p>
          <strong>Essence:</strong> {creature.essence}
        </p>
      </div>

      <MiniCreature creature={creature} isCentered={true} />

      <DiceRoller
        setResult={handleResult}
        result={essenceResult}
        creature={creature}
      />

      <div className="text-3xl h-20 font-bold">
        {essenceResult !== null && (
          <p>🎯 New Essence Affectation : {essenceResult}</p>
        )}
      </div>
      <div className="w-full flex flex-col justify-center align-middle items-center">
        <button className="bg-emerald-700 m-4 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:bg-emerald-600 hover:scale-105 z-[100]">
          <Link to="/game">Return into the void</Link>
        </button>
      </div>
    </div>
  );
};

export default OffspringDetails;
