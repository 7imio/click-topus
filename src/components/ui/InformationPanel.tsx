import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

const InformationPanel: FC = () => {
  const {
    essence: essenceState,
    creatures,
    autoClicker,
    corruption,
  } = useAppSelector((state) => state);

  const { essence, purchasedItems, totalHarvestedEssence } = essenceState;
  const { currentEssence, created, creatures: creatureList } = creatures;
  const { count, currentCost, click } = autoClicker;

  return (
    <div className="absolute bottom-0 left-0 pointer-events-none bg-black/70 text-green-300 text-xs p-3 rounded-tr-lg z-50 max-w-xs overflow-y-auto">
      <h2 className="text-sm font-bold mb-2 text-white">🧪 Informations </h2>
      <ul className="space-y-1">
        <li>🧬 Essence: {essence}</li>
        <li>🧪 Total Harvested: {totalHarvestedEssence}</li>
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
        <li>👁️ Creature Essence: {currentEssence}</li>
        <li>👾 created octopods: {created}</li>
        {creatureList && (
          <ul>
            {creatureList.map((c) => {
              return (
                <li>
                  {c.creatureName} - power : {c.essence}
                </li>
              );
            })}
          </ul>
        )}
        <li>
          🤖 Force : {count} - Cultistes : {click}
        </li>
        <li>💰 Next Upgrade Cost: {currentCost}</li>
        {corruption && <li>☣️ Corruption: {corruption.corruption}</li>}
        <hr className="my-2 border-green-500" />
      </ul>
    </div>
  );
};

export default InformationPanel;
