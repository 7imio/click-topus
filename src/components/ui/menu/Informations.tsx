import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Link } from 'react-router-dom';

interface InformationProps {
  isPanel?: boolean;
}
const Informations: FC<InformationProps> = ({ isPanel }) => {
  const {
    essence: essenceState,
    creatures,
    autoClicker,
    corruption,
    skin,
  } = useAppSelector((state) => state);

  const { essence, purchasedItems, totalHarvestedEssence } = essenceState;
  const { currentEssence, created } = creatures;
  const { count, currentCost, click } = autoClicker;

  return (
    <div
      className={
        isPanel
          ? 'absolute bottom-0 left-0 pointer-events-none bg-black/70 text-green-300 text-xs p-3 rounded-tr-lg z-50 max-w-xs overflow-y-auto'
          : 'min-h-screen text-green-200 p-6'
      }
    >
      <ul className="space-y-1">
        <li>🧬 Essence: {essence}</li>
        <li>🧪 Total Harvested: {totalHarvestedEssence}</li>
        <hr className="my-2 border-green-500" />
        <ul>
          🛒 Purchased Items:
          {purchasedItems.length > 0 ? (
            Object.entries(
              purchasedItems.reduce<Record<string, number>>((acc, name) => {
                acc[name] = (acc[name] || 0) + 1;
                return acc;
              }, {})
            ).map(([name, count]) => (
              <li key={name}>
                {name} x{count}
              </li>
            ))
          ) : (
            <li>None</li>
          )}
        </ul>
        <hr className="my-2 border-green-500" />
        <li>👁️ Creature Essence: {currentEssence}</li>
        <li>Actual Skin : {skin.currentSkin.name}</li>
        <li>👾 created octopods: {created}</li>
        <li>
          🤖 Strenght : {count} - Cultists : {click}
        </li>
        <li>💰 Next Upgrade Cost: {currentCost}</li>
        <hr className="my-2 border-green-500" />
        {corruption && <li>☣️ Corruption: {corruption.corruption}</li>}
      </ul>

      {!isPanel && (
        <div className="flex flex-row justify-center bg-center mt-4">
          <Link to="/game">
            <button className="bg-emerald-700 hover:bg-emerald-600 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:scale-105">
              Return into the void
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Informations;
