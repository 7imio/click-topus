import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import MiniCreature from '../../background/MiniCreature';
import { Creature, updateCreature } from '../../../store/slices/creatureSlice';
import DiceRoller from './dice/DiceRoller';
import { useState } from 'react';
import { generateRandomName } from '../../../helpers/name-utils';
import { Check, Dice5Icon, Pencil, X } from 'lucide-react';

const OffspringDetails = () => {
  const { creatureId } = useParams<{ creatureId: string }>();
  const [essenceResult, setEssenceResult] = useState<number | null>(null);
  const dispatch = useAppDispatch();

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

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState<string>();

  const handleValidNewName = () => {
    setIsRenaming(false);
    const { creatureId } = creature;
    const updatedCreature = {
      ...creature,
      creatureName: name ?? 'unnamed',
    };
    console.log(name);
    dispatch(updateCreature({ creatureId, creature: updatedCreature }));
  };

  const handleGenerateNewName = () => {
    const newName = generateRandomName();
    setName(newName);
  };

  return (
    <div className="h-screen p-6 text-green-200">
      <div className="w-full flex flex-col justify-center align-middle items-center">
        <h1 className="text-2xl font-bold mb-4">🧬 Octopode Detail</h1>
        <h2 className="text-xl font-bold mb-4 w-full flex flex-row justify-between">
          <strong>Name:</strong>{' '}
          {isRenaming ? (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          ) : (
            (creature.creatureName ?? 'Unnamed')
          )}{' '}
          {!isRenaming ? (
            <button
              onClick={() => {
                setIsRenaming(true);
                setName(creature.creatureName);
              }}
            >
              <Pencil />
            </button>
          ) : (
            <>
              <button onClick={handleValidNewName}>
                <Check />
              </button>
              <button onClick={() => setIsRenaming(false)}>
                <X />{' '}
              </button>
              <button onClick={handleGenerateNewName}>
                <Dice5Icon />
              </button>
            </>
          )}
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
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
