import { Link } from 'react-router-dom';
import { Creature } from '../../../types/Creature';
import Eye from '../../creatures/Eye';
import { FC } from 'react';

interface OctopodeLineProps {
  creature: Creature;
  onFarewell?: (creatureId: string) => void;
  disableClick?: boolean;
}

const OctopodeLine: FC<OctopodeLineProps> = ({
  creature,
  onFarewell,
  disableClick,
}) => {
  const status = creature.isDead
    ? '☠️ Dead'
    : creature.isInConquest
      ? '🚀 In Conquest'
      : creature.canConquest
        ? '🟢 Ready'
        : '⚪ Idle';

  return (
    <div
      className={`flex justify-between items-center p-1 border-2 rounded-lg shadow-md transition-all duration-200 w-full max-w-4xl mx-auto
      ${creature.isDead ? 'border-red-600 bg-red-900 text-red-100' : 'border-green-600 bg-green-900 text-green-100'}
      `}
    >
      {disableClick ? (
        <div className="flex items-center gap-4 w-full cursor-default">
          <Eye skin={creature.skin} disablePopEffect miniEye />

          {/* Name with fixed width and ellipsis */}
          <span className="w-48 truncate">{creature.creatureName}</span>

          {/* Essence */}
          <span className="w-32 text-center">Essence: {creature.essence}</span>

          {/* Skills */}
          <span className="w-32 text-center">
            Skills: {creature.skills?.length || 0}
          </span>

          {/* Status */}
          <span className="w-40 text-center">Status: {status}</span>

          {/* Victories */}
          <span className="w-32 text-center">
            Victories: {creature.victories || 0}
          </span>
        </div>
      ) : (
        <Link
          className="flex items-center gap-4 w-full hover:text-green-200"
          to={`/octopodes/${creature.creatureId}`}
        >
          <Eye skin={creature.skin} disablePopEffect miniEye />

          {/* Name with fixed width and ellipsis */}
          <span className="w-30 truncate">{creature.creatureName}</span>

          {/* Essence */}
          <span className="w-32 text-center text-nowrap overflow-hidden text-ellipsis whitespace-nowrap truncate">
            Essence: {creature.essence}
          </span>

          {/* Skills */}
          <span className="w-24 text-center">
            Skills: {creature.skills?.length || 0}
          </span>

          {/* Status */}
          <span className="w-40 text-center">Status: {status}</span>

          {/* Victories */}
          <span className="w-32 text-center">
            Victories: {creature.victories || 0}
          </span>
        </Link>
      )}

      {creature.isDead && onFarewell && (
        <button
          className="ml-4 px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded whitespace-nowrap"
          onClick={() => onFarewell(creature.creatureId)}
        >
          🕯️ Farewell
        </button>
      )}
    </div>
  );
};

export default OctopodeLine;
