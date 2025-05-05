import { FC } from 'react';
import Eye from './Eye';
import SegmentedTentacle from './SegmentedTentacle';
import Bubbles from './Bubbles';
import { MAX_TENTACLES } from '../constants/creatures';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import SkinSwitcherButton from './SkinSwitcherButton';
import MiniCreature from './MiniCreature';
import AutoClickerPrompt from './AutoClickerPrompt';
import useEssenceIncrement from '../Hooks/useEssenceIncrement';
import useAutoClickers from '../Hooks/useAutoClickers';
import { triggerDebug } from '../store/slices/debugSlice';
import Debug from './Debug';

export interface Tentacles {
  id: string;
  essence: number; // MAX 200
}

const Abyss: FC = () => {
  const { totalHarvestedEssence } = useAppSelector((state) => state.essence);
  const { currentSkin } = useAppSelector((state) => state.skin);
  const { created } = useAppSelector((state) => state.creatures);
  const { popEffect } = useAppSelector((state) => state.animation);
  const { DEBUG } = useAppSelector((state) => state.debug);

  const tentacles = useAppSelector((state) => state.tentacles.tentacles);
  const angleStep = 360 / MAX_TENTACLES;

  const handleClick = useEssenceIncrement();
  const dispatch = useAppDispatch();

  useAutoClickers();

  const handleDebug = () => dispatch(triggerDebug());

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-gray-900">
        <h1 className="text-4xl font-bold text-purple-500 z-50 text-shadow">
          Essence: {totalHarvestedEssence}
        </h1>
        <button
          className="bg-neutral-500 text-2xl text-amber-50"
          onClick={handleDebug}
        >
          DEBUG {DEBUG ? 'ON' : 'OFF'}
        </button>
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
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Eye
              irisColor={currentSkin.skin.irisColor}
              tentacleColor={currentSkin.skin.bodyColor}
              handleClick={handleClick}
              popEffect={popEffect}
            >
              {tentacles.map((tentacle, idx) => (
                <div
                  key={tentacle.id}
                  onClick={handleClick}
                  className="absolute top-1/2 left-1/3"
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
