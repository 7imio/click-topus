import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import MiniCreature from '../background/MiniCreature';

const OffspringDetails = () => {
  const { creatureId } = useParams<{ creatureId: string }>();
  console.log(creatureId);
  const creature = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === creatureId)
  );

  if (!creature) {
    return <p className="text-red-500">❌ Creature not found</p>;
  }

  return (
    <>
      <div className=" h-screen p-6 text-green-200">
        <h1 className="text-2xl font-bold mb-4">🧬 Octopode Detail</h1>
        <p>
          <strong>ID:</strong> {creature.creatureId}
        </p>
        <p>
          <strong>Name:</strong> {creature.creatureName ?? 'Unnamed'}
        </p>
        <p>
          <strong>Essence:</strong> {creature.essence}
        </p>

        <MiniCreature creature={creature} isCentered={true} />
        <button className="bg-emerald-700 m-4 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:bg-emerald-600 hover:scale-105 z-[100]">
          <Link to="/game">Return into the void</Link>
        </button>
      </div>
    </>
  );
};

export default OffspringDetails;
