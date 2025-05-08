import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { darkenHex } from '../../helpers/color-utils';

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
          <span
            className="w-4 h-4 rounded-full animate-glow"
            style={{
              background: `linear-gradient(135deg, ${c.skin.bodyColor}, ${darkenHex(
                c.skin.bodyColor,
                1
              )})`,
            }}
          />
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
