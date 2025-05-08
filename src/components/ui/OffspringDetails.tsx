import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

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
    <div className="p-6 text-green-200">
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
      <p>
        <strong>Skin:</strong>
      </p>
      <ul className="ml-4">
        <li>• Body: {creature.skin.bodyColor}</li>
        <li>• Iris: {creature.skin.irisColor}</li>
        <li>• Suckers: {creature.skin.suckerColor}</li>
      </ul>
    </div>
  );
};

export default OffspringDetails;
