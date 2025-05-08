import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import useEssenceHelper from '../../hooks/useEssenceHelper';

const Debug: FC = () => {
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
  const { currentEssence, created, essencePerSegment } = creatures;
  const { count, currentCost, click } = autoClicker;
  const { popEffect } = animation;

  const { essencePerTentacle, essenceForCreature } = useEssenceHelper();

  return (
    <div className="absolute top-0 left-0 pointer-events-none bg-black/70 text-green-300 text-xs p-3 rounded-tr-lg z-50 max-w-xs overflow-y-auto">
      <h2 className="text-sm font-bold mb-2 text-white">🧪 Debug Info</h2>
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
        <li>🎨 Skin: {currentSkin.name}</li>
        <li>🐙 Tentacles: {tentacleList.length}</li>
        <li>👁️ Creature Essence: {currentEssence}</li>
        <li>👾 Rejetons créés: {created}</li>
        <li>
          🤖 Force : {count} - Cultistes : {click}
        </li>
        <li>💰 Next AutoClicker Cost: {currentCost}</li>
        <li>✨ Pop Effect: {popEffect ? 'ON' : 'OFF'}</li>
        {corruption && <li>☣️ Corruption: {corruption.corruption}</li>}
        <hr className="my-2 border-green-500" />
        <li>📈 Coûts en essence :</li>
        <li> • Par segment : {essencePerSegment}</li>
        <li> • Par tentacule : {essencePerTentacle}</li>
        <li> • Par créature (octopode) : {essenceForCreature}</li>
      </ul>
    </div>
  );
};

export default Debug;
