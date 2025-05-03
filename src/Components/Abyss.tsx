import { FC, useState } from 'react';
import Eye from './Eye';
import SegmentedTentacle from './SegmentedTentacle';
import Bubbles from './Bubbles';
import { MAX_TENTACLES, SEGMENTS_PER_TENTACLE } from '../constants/tentacles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment } from '../store/slices/essenceSlice';
import SkinSwitcherButton from './SkinSwitcherButton';
import { incrementTentacleEssence } from '../store/slices/tentacleSlice';

export interface Tentacles {
  id: string;
  essence: number; // MAX 200
}

const Abyss: FC = () => {
  const dispatch = useAppDispatch();
  const { essence } = useAppSelector((state) => state.essence);
  const { currentSkin } = useAppSelector((state) => state.skin);

  const tentacles = useAppSelector((state) => state.tentacles.tentacles);
  const angleStep = 360 / MAX_TENTACLES;

  const handleClick = () => {
    dispatch(incrementTentacleEssence());
    dispatch(increment());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-gray-900">
      <h1 className="text-4xl font-bold text-purple-800">Essence: {essence}</h1>
      <SkinSwitcherButton />
      <Bubbles />
      <div className="relative w-[600px] h-[600px]">
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
                className="absolute top-[50%]"
                style={{
                  transform: `rotate(${idx * angleStep}deg)`,
                  transformOrigin: 'top center',
                }}
              >
                <SegmentedTentacle
                  totalClicks={tentacle.essence}
                  bodyColor={currentSkin.skin.bodyColor}
                  suctionColor={currentSkin.skin.suckerColor}
                  debug={false}
                />
              </div>
            ))}
          </Eye>
        </div>
      </div>
    </div>
  );
};

export default Abyss;
