import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import MiniCreature from '../../background/MiniCreature';
import {
  resetCreatureSkills,
  updateCreature,
} from '../../../store/slices/creatureSlice';
import { useState } from 'react';
import { generateRandomName } from '../../../helpers/name-utils';
import { Check, Dice5Icon, Pencil, X } from 'lucide-react';
import { Creature } from '../../../types/Creature';
import { rerollCreatureSkills } from '../../../store/slices/corruptionSlice';

const OctopodeDetails = () => {
  const { creatureId } = useParams<{ creatureId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const creature: Creature | undefined = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === creatureId)
  );

  if (!creature) {
    return (
      <p className="text-red-500 text-center mt-10">❌ Creature not found</p>
    );
  }

  const { corruption, rerollMultiplicator, currentCost } = useAppSelector(
    (state) => state.corruption
  );

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState<string>(creature.creatureName);

  const handleValidNewName = () => {
    if (!name) return;
    setIsRenaming(false);
    dispatch(
      updateCreature({
        creatureId: creature.creatureId,
        creature: { ...creature, creatureName: name },
      })
    );
  };

  const handleGenerateNewName = () => setName(generateRandomName());

  const handleRerollSkills = () => {
    if (!creatureId) return;
    dispatch(rerollCreatureSkills({ creatureId }));
    dispatch(resetCreatureSkills({ creatureId }));
  };

  const handleFarewell = () => {
    // On considère qu’on récupère la moitié de son essence en corruption
    // const corruptionGain = Math.floor(creature.essence / 2);
    //dispatch(gainCorruption(corruptionGain));
    // dispatch(removeCreature({ creatureId: creature.creatureId }));
    navigate('/octopodes');
  };

  const canRerollSkills = corruption >= currentCost * rerollMultiplicator;

  return (
    <div className="h-screen p-6 text-green-200 flex flex-col items-center">
      <div className="absolute -top-60 left-0 z-0">
        <MiniCreature creature={creature} isCentered />
      </div>

      <h1 className="text-3xl font-bold mb-6">🧬 Octopode Detail</h1>

      {/* Nom de la créature */}
      <div className="flex items-center gap-4 mb-4 w-full max-w-lg justify-between">
        <strong>Name:</strong>
        {isRenaming ? (
          <input
            className="text-black p-1 rounded"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        ) : (
          <span>{creature.creatureName || 'Unnamed'}</span>
        )}

        {!isRenaming ? (
          <button onClick={() => setIsRenaming(true)}>
            <Pencil />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleValidNewName}>
              <Check />
            </button>
            <button onClick={() => setIsRenaming(false)}>
              <X />
            </button>
            <button onClick={handleGenerateNewName}>
              <Dice5Icon />
            </button>
          </div>
        )}
      </div>

      {/* Infos supplémentaires */}
      <div className="text-center space-y-2 mb-6 z-100">
        <p>
          <strong>Essence:</strong> {creature.essence}
        </p>
        <p>
          <strong>Victories:</strong> {creature.victories || 0}
        </p>
        {creature.lastConquestTarget && (
          <p>
            <strong>Last Target:</strong> {creature.lastConquestTarget}
          </p>
        )}
        {creature.isDead && (
          <p className="text-red-400 font-bold">☠️ This Octopode is dead.</p>
        )}
        <p className="text-xl font-bold">Current Corruption: {corruption}</p>
      </div>

      {/* Bouton Reroll / Affect Skills */}
      <button
        onClick={() => navigate(`/octopodes/${creature.creatureId}/skills`)}
        className="mt-4 px-6 py-2 bg-green-500 z-100 hover:bg-green-600 text-white font-bold rounded-full"
      >
        🎲{' '}
        {creature.skills && creature.skills?.length < 3
          ? 'Affect Skills & '
          : ''}
        Roll the Dice
      </button>

      {/* Affichage des compétences */}
      {creature.skills && creature.skills.length > 0 && (
        <>
          <div className="relative w-80 z-100 border-4 border-green-500 rounded-lg bg-black/70 shadow-lg p-4 my-6">
            {creature.skills.map((skill) => (
              <div key={skill.name} className="mb-2">
                <strong>{skill.name}</strong>
                <p className="text-center text-sm text-green-300">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <button
            className={`mt-4 px-6 py-2 z-100 ${
              !canRerollSkills
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-white font-bold rounded-full`}
            onClick={handleRerollSkills}
            disabled={!canRerollSkills}
          >
            Reroll Skills – Cost {currentCost * rerollMultiplicator} Corruption
          </button>
        </>
      )}

      {/* Bouton Farewell */}
      <button
        className="mt-8 px-6 py-2 z-100 bg-red-700 hover:bg-red-600 text-white font-bold rounded-full flex items-center gap-2"
        onClick={handleFarewell}
      >
        🕯️ Farewell (Gain {Math.floor(creature.essence / 2)} Corruption)
      </button>

      {/* Retour au jeu */}
      <Link
        to="/game"
        className="bg-emerald-700 z-100 mt-10 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:bg-emerald-600 hover:scale-105"
      >
        Return into the Void
      </Link>
    </div>
  );
};

export default OctopodeDetails;
