import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  buyFirstAutoclicker,
  buyAutoClicker,
  upgradeAutoclicker,
} from '../../store/slices/autoClickerSlice';
import { buyEssenceItem } from '../../store/slices/essenceSlice';

const AutoClickerPrompt: FC = () => {
  const dispatch = useAppDispatch();

  const { count, currentCost } = useAppSelector((state) => state.autoClicker);
  const { totalHarvestedEssence } = useAppSelector((state) => state.essence);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false);

  const canAfford: boolean = totalHarvestedEssence >= currentCost;

  useEffect(() => {
    if (!canAfford) {
      setIsDisplaying(false);
    }
  }, [canAfford]);

  const handleBuyFirstAutoclicker = () => {
    dispatch(buyEssenceItem({ name: 'First Cultist', cost: currentCost }));
    dispatch(buyFirstAutoclicker());
  };

  const handleBuyAutoclicker = (name: string) => {
    dispatch(buyEssenceItem({ name, cost: currentCost }));
    dispatch(buyAutoClicker());
  };

  const handleUpgradeAutoclicker = (name: string) => {
    dispatch(buyEssenceItem({ name, cost: currentCost }));
    dispatch(upgradeAutoclicker());
  };

  const handleDisplay = () => {
    setIsDisplaying(!isDisplaying);
  };

  return (
    canAfford && (
      <>
        <div className="fixed top-5 w-full max-w-xs text-right animate-sucker-pop z-50">
          <button onClick={handleDisplay}>📜</button>
        </div>
        {isDisplaying && (
          <div className="fixed top-15 w-full max-w-xs bg-black/80 text-white px-4 py-3 rounded-lg shadow-xl border border-green-500 animate-fadeIn z-50">
            <p className="text-xs mb-2">Cost: {currentCost} essence</p>
            <div className="flex flex-col">
              {count === 0 ? (
                <button
                  className={`text-sm px-3 py-1 rounded my-1 transition-colors ${canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'}`}
                  disabled={!canAfford}
                  onClick={() => handleBuyFirstAutoclicker()}
                >
                  Recruit First Cultist
                </button>
              ) : (
                <>
                  <button
                    className={`text-sm px-3 py-1 rounded my-1 transition-colors ${canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'}`}
                    disabled={!canAfford}
                    onClick={() => handleBuyAutoclicker('Cult Strenght')}
                  >
                    Upgrade Cult Strenght
                  </button>
                  <button
                    className={`text-sm px-3 py-1 rounded my-1 transition-colors ${canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'}`}
                    disabled={!canAfford}
                    onClick={() => handleUpgradeAutoclicker('Cultist')}
                  >
                    Endoctrinate Cultist
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </>
    )
  );
};

export default AutoClickerPrompt;
