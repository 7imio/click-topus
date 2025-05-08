import { FC } from 'react';
import useAutoClickers from '../../hooks/useAutoClickers';
import useEssenceIncrement from '../../hooks/useEssenceIncrement';
import useSaveGame from '../../hooks/useSaveGame';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { triggerDebug } from '../../store/slices/debugSlice';
import Bubbles from '../background/Bubbles';
import MiniCreature from '../background/MiniCreature';
import Eye from '../creatures/Eye';
import SegmentedTentacle from '../creatures/SegmentedTentacle';
import AutoClickerPrompt from '../ui/AutoClickerPrompt';
import Debug from '../ui/Debug';
import ResetButton from '../ui/ResetButton';
import SkinSwitcherButton from '../ui/SkinSwitcherButton';

export interface Tentacles {
  id: string;
  essence: number; // MAX 200
}

const Abyss: FC = () => {
  useSaveGame();

  const { totalHarvestedEssence } = useAppSelector((state) => state.essence);
  const { currentSkin } = useAppSelector((state) => state.skin);
  const { created, maxTentacles } = useAppSelector((state) => state.creatures);

  const { DEBUG } = useAppSelector((state) => state.debug);

  const tentacles = useAppSelector((state) => state.tentacles.tentacles);
  const angleStep = 360 / maxTentacles;

  const handleClick = useEssenceIncrement();
  const dispatch = useAppDispatch();

  useAutoClickers();

  const handleDebug = () => dispatch(triggerDebug());

  return (
    <>
      <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-900 to-gray-900">
        <div className="absolute top-0 left-0">
          <button
            className="bg-neutral-500 text-2xl text-amber-50"
            onClick={handleDebug}
          >
            DEBUG {DEBUG ? 'ON' : 'OFF'}
          </button>
          <ResetButton />
        </div>
        <h1 className="text-4xl font-bold text-purple-500 z-50 text-shadow">
          Essence: {totalHarvestedEssence}
        </h1>

        {DEBUG && <Debug />}
        <SkinSwitcherButton />
        <AutoClickerPrompt />
        <Bubbles />
        {created > 0 &&
          Array.from({ length: created }).map((_, i) => (
            <MiniCreature
              bodyColor={currentSkin.skin.bodyColor}
              irisColor={currentSkin.skin.irisColor}
              suckerColor={currentSkin.skin.suckerColor}
              index={i}
            />
          ))}
        <div className="relative w-full h-[600px] aspect-square">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Eye
              irisColor={currentSkin.skin.irisColor}
              tentacleColor={currentSkin.skin.bodyColor}
              handleClick={handleClick}
            >
              {tentacles.map((tentacle, idx) => (
                <div
                  key={tentacle.id}
                  onClick={handleClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2"
                  style={{
                    transform: `rotate(${idx * angleStep}deg)`,
                    transformOrigin: 'top center',
                  }}
                >
                  <SegmentedTentacle
                    totalClicks={tentacle.essence}
                    bodyColor={currentSkin.skin.bodyColor}
                    suctionColor={currentSkin.skin.suckerColor}
                    debug={DEBUG}
                  />
                </div>
              ))}
            </Eye>
          </div>
        </div>
      </div>
    </>
  );
};

export default Abyss;
