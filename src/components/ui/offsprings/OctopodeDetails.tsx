import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import MiniCreature from '../../background/MiniCreature';
import { updateCreature } from '../../../store/slices/creatureSlice';
import { useState } from 'react';
import { generateRandomName } from '../../../helpers/name-utils';
import { Check, Dice5Icon, Pencil, X } from 'lucide-react';
import { Creature } from '../../../types/Creature';

const OctopodeDetails = () => {
  const { creatureId } = useParams<{ creatureId: string }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
    dispatch(updateCreature({ creatureId, creature: updatedCreature }));
  };

  const handleGenerateNewName = () => {
    const newName = generateRandomName();
    setName(newName);
  };

  return (
    <div className="h-screen p-6 text-green-200">
      <div className="z-0 absolute -top-60 left-0">
        <MiniCreature creature={creature} isCentered={true} />
      </div>
      <div className="w-full flex flex-col justify-center align-middle items-center">
        <h1 className="text-2xl font-bold mb-4">🧬 Octopode Detail</h1>
        <h2 className="text-xl font-bold mb-4 w-full flex flex-row justify-between">
          <strong>Name:</strong>
          {isRenaming ? (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          ) : (
            (creature.creatureName ?? 'Unnamed')
          )}
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
      <button
        onClick={() => navigate(`/octopodes/${creature.creatureId}/skills`)}
        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
      >
        🎲 {creature.skills && creature.skills.length < 3 && 'Affect skills & '}
        Roll the dice
      </button>
      {creature.skills && creature.skills?.length > 0 && (
        <div className="relative  overflow-hidden w-80 border-4 border-green-500 rounded-lg bg-black shadow-lg opacity-70">
          {creature.skills.map((skill) => {
            return (
              <div key={skill.name}>
                <strong className="ml-4">{skill.name}</strong> :{' '}
                <p className="py-2 pl-4 pr-3 text-center">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full flex flex-col justify-center">
        <button className="bg-emerald-700 m-4 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:bg-emerald-600 hover:scale-105 z-[100]">
          <Link to="/game">Return into the void</Link>
        </button>
      </div>
    </div>
  );
};

export default OctopodeDetails;
