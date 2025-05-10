import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Eye from '../creatures/Eye';

const Offsprings = () => {
  const { creatures } = useAppSelector((state) => state.creatures);

  return creatures && creatures.length > 0 ? (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {creatures.map((c) => (
        <Link
          key={c.creatureId}
          to={`/offsprings/${c.creatureId}`}
          className="flex items-center gap-3 px-4 py-2 bg-green-900 hover:bg-green-700 text-green-100 rounded-lg shadow-md transition-all duration-200"
        >
          <Eye skin={c.skin} disablePopEffect={true} miniEye={true} />
          <span className="font-semibold text-sm">
            {c.creatureName ?? 'Unnamed'}
          </span>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center text-green-300 mt-10">
      No creatures have been summoned yet.
    </p>
  );
};

export default Offsprings;
