import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyAutoClicker } from '../store/slices/autoClickerSlice';
import { buyItem } from '../store/slices/essenceSlice';

const AutoClickerPrompt: FC = () => {
  const dispatch = useAppDispatch();

  const { count, currentCost } = useAppSelector((state) => state.autoClicker);

  const { totalHarvestedEssence } = useAppSelector((state) => state.essence);

  const canAfford = totalHarvestedEssence >= currentCost;

  const handleBuy = () => {
    if (!canAfford) return;
    dispatch(buyItem({ name: 'autoClicker', cost: currentCost }));
    dispatch(buyAutoClicker());
  };

  if (!canAfford) return null;

  return (
    <div className="fixed bottom-10 right-10 bg-black/80 text-white px-4 py-3 rounded-lg shadow-xl border border-green-500 animate-fadeIn scale-100 transition-transform z-50">
      <p className="text-sm mb-1">
        AutoClickers: <strong>{count}</strong>
      </p>
      <p className="text-xs mb-2">Cost: {currentCost} essence</p>
      <button
        className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 rounded"
        onClick={handleBuy}
      >
        Buy
      </button>
    </div>
  );
};

export default AutoClickerPrompt;
