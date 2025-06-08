import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { buyFirstAutoclicker, buyAutoClicker, upgradeAutoclicker } from '../../store/slices/autoClickerSlice';
import { buyEssenceItem } from '../../store/slices/essenceSlice';
import Modal from '../generics/Modal';

const AutoClickerPrompt: FC = () => {
  const dispatch = useAppDispatch();
  const { speed, currentCost } = useAppSelector((state) => state.autoClicker);
  const { essence } = useAppSelector((state) => state.essence);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const canAfford = essence >= currentCost;

  useEffect(() => {
    if (!canAfford) {
      setIsOpen(false);
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

  return (
    canAfford && (
      <>
        {/* Open Button */}
        <div className="fixed top-5 w-full px-4 text-right animate-sucker-pop z-50">
          <button
            className="text-4xl p-4 animate-glow bg-neutral-50/25 backdrop-blur-md text-shadow-md 
            rounded-full"
            onClick={() => setIsOpen(true)}
          >
            📜
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p className="text-center text-md mb-4 text-white">Cost: {currentCost} essence</p>

          <div className="flex justify-center">
            <div className="flex flex-col space-y-3 items-center">
              {speed === 0 ? (
                <button
                  className={`text-sm px-4 py-3 rounded transition-colors w-[24rem] ${
                    canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'
                  }`}
                  disabled={!canAfford}
                  onClick={handleBuyFirstAutoclicker}
                >
                  Recruit First Cultist
                </button>
              ) : (
                <>
                  <button
                    className={`text-sm px-4 py-3 rounded transition-colors w-[24rem] ${
                      canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'
                    }`}
                    disabled={!canAfford}
                    onClick={() => handleBuyAutoclicker('Cult Strenght')}
                  >
                    Upgrade Cult Strenght
                  </button>
                  <button
                    className={`text-sm px-4 py-3 rounded transition-colors w-[24rem] ${
                      canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-neutral-600 disabled'
                    }`}
                    disabled={!canAfford}
                    onClick={() => handleUpgradeAutoclicker('Cultist')}
                  >
                    Endoctrinate Cultist
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      </>
    )
  );
};

export default AutoClickerPrompt;
