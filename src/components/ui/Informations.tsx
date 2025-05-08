import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import useEssenceHelper from '../../hooks/useEssenceHelper';
import { Link } from 'react-router-dom';

const Informations: FC = () => {
  const {
    essence: essenceState,
    skin,
    tentacles,
    creatures,
    autoClicker,
    animation,
    corruption,
  } = useAppSelector((state) => state);

  const { essence, purchasedItems, totalHarvestedEssence } = essenceState;
  const { currentSkin } = skin;
  const { tentacles: tentacleList } = tentacles;
  const {
    currentEssence,
    created,
    essencePerSegment,
    creatures: creatureList,
  } = creatures;
  const { count, currentCost, click } = autoClicker;
  const { popEffect } = animation;

  const { essencePerTentacle, essenceForCreature } = useEssenceHelper();

  return (
    <div className="min-h-screen  text-green-200 p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        📊 Informations Générales
      </h1>

      <ul className="space-y-2 text-sm">
        <li>🧬 Essence actuelle : {essence}</li>
        <li>🧪 Essence totale récoltée : {totalHarvestedEssence}</li>

        <li>🛒 Objets achetés :</li>
        <ul className="ml-4">
          {purchasedItems.length > 0 ? (
            Object.entries(
              purchasedItems.reduce<Record<string, number>>((acc, name) => {
                acc[name] = (acc[name] || 0) + 1;
                return acc;
              }, {})
            ).map(([name, count]) => (
              <li key={name}>
                {name} ×{count}
              </li>
            ))
          ) : (
            <li>Aucun</li>
          )}
        </ul>

        <li>🎨 Skin actuel : {currentSkin.name}</li>
        <li>🐙 Nombre de tentacules : {tentacleList.length}</li>
        <li>
          👁️ Essence accumulée pour la créature en cours : {currentEssence}
        </li>
        <li>👾 Nombre total de créatures invoquées : {created}</li>

        {creatureList && creatureList.length > 0 && (
          <li>
            <h2 className="mt-4 mb-2 font-bold text-green-400">
              📚 Détail des créatures :
            </h2>
            <ul className="ml-4 list-disc">
              {creatureList.map((c) => (
                <li key={c.creatureId}>
                  {c.creatureName ?? 'Unnamed'} – Essence : {c.essence}
                </li>
              ))}
            </ul>
          </li>
        )}

        <li>
          🤖 AutoClickers : Force {count}, Cultistes par clic : {click}
        </li>
        <li>💰 Coût du prochain AutoClicker : {currentCost}</li>
        <li>✨ Pop Effect actif : {popEffect ? 'Oui' : 'Non'}</li>
        {corruption && (
          <li>☣️ Corruption accumulée : {corruption.corruption}</li>
        )}

        <hr className="my-4 border-green-600" />

        <li className="font-bold text-green-400">📈 Coûts de production :</li>
        <ul className="ml-4">
          <li>• Par segment : {essencePerSegment}</li>
          <li>• Par tentacule : {essencePerTentacle}</li>
          <li>• Par créature (octopode) : {essenceForCreature}</li>
        </ul>
      </ul>
      <div className="flex flex-row justify-center bg-center mt-4">
        <Link to="/game">
          <button className="bg-emerald-700 hover:bg-emerald-600 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:scale-105">
            Return into the void
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Informations;
