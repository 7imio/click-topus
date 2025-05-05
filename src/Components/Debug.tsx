import { FC } from 'react';
import { useAppSelector } from '../store/hooks';

const Debug: FC = () => {
  const {
    essence: essenceState,
    skin,
    tentacles,
    creatures,
    autoClicker,
    animation,
  } = useAppSelector((state) => state);

  const { essence, purchasedItems, totalHarvestedEssence } = essenceState;
  const { currentSkin } = skin;
  const { tentacles: tentacleList } = tentacles;
  const { currentEssence, created } = creatures;
  const { count, currentCost } = autoClicker;
  const { popEffect } = animation;

  return (
    <div className="absolute top-0 left-0 bg-black/70 text-green-300 text-xs p-3 rounded-tr-lg z-50 max-w-xs overflow-y-auto max-h-[60vh]">
      <h2 className="text-sm font-bold mb-2 text-white">🧪 Debug Info</h2>
      <ul className="space-y-1">
        <li>🧬 Essence: {essence}</li>
        <li>🧪 Total Harvested: {totalHarvestedEssence}</li>
        <li>🛒 Purchased Items: {purchasedItems.join(', ') || 'None'}</li>
        <li>🎨 Skin: {currentSkin.name}</li>

        <li>🐙 Tentacles: {tentacleList.length}</li>
        <ul className="ml-4 list-disc">
          {tentacleList.map((t) => (
            <li key={t.id}>
              ID: {t.id}| Essence: {t.essence}
            </li>
          ))}
        </ul>

        <li>👁️ Creature Essence: {currentEssence}</li>
        <li>👾 Rejetons créés: {created}</li>

        <li>🤖 AutoClickers: {count}</li>
        <li>💰 Next AutoClicker Cost: {currentCost}</li>

        <li>✨ Pop Effect: {popEffect ? 'ON' : 'OFF'}</li>
      </ul>
    </div>
  );
};

export default Debug;
