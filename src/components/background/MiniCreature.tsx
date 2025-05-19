import { FC, memo, useRef, useState } from 'react';
import Eye from '../creatures/Eye';
import SegmentedTentacle from '../creatures/SegmentedTentacle';
import { useAppSelector } from '../../store/hooks';
import { CreatureState } from '../../store/slices/creatureSlice';
import { Creature } from '../../types/Creature';

type MiniCreatureProps = {
  creature: Creature;
  isCentered?: boolean;
};

const MiniCreature: FC<MiniCreatureProps> = ({ creature, isCentered }) => {
  const globalCreature = useAppSelector((state) => state.creatures);
  const { skin } = creature;
  const [creatureData] = useState<
    Pick<
      CreatureState,
      | 'maxTentacles'
      | 'segmentsPerTentacle'
      | 'essencePerSegment'
      | 'segmentsType'
    >
  >(() => ({
    maxTentacles: globalCreature.maxTentacles,
    segmentsPerTentacle: globalCreature.segmentsPerTentacle,
    essencePerSegment: globalCreature.essencePerSegment,
    segmentsType: globalCreature.segmentsType,
  }));

  const angleStep = 360 / 8;

  const [size] = useState(20 + Math.random() * 10);
  const uuid = creature.creatureId;

  const [actualSkin] = useState(skin);

  const creatureRef = useRef<HTMLDivElement>(null);
  const [position] = useState(() => {
    if (isCentered) {
      return {
        x: window.innerWidth / 2 - size / 2,
        y: window.innerHeight / 1.5 - size / 2,
      };
    }
    return {
      x: Math.floor(20 + Math.random() * (window.innerWidth - 20 * 2 - size)),
      y: Math.floor(20 + Math.random() * (window.innerHeight - 20 * 2 - size)),
    };
  });
  const [animationDuration] = useState(4 + Math.random() * 3);
  return creature ? (
    <div
      key={uuid}
      ref={creatureRef}
      className="absolute animate-dance animate-floaty"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.5,
        zIndex: 0,

        animationDuration: `${animationDuration}s`,
      }}
    >
      <div className="relative w-[100px] h-[100px]">
        <div className="absolute inset-0 flex items-center justify-center animate-rotate-creature">
          <Eye disablePopEffect={true} skin={actualSkin}>
            {[...Array(creatureData.maxTentacles)].map((_, idx) => (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${idx * angleStep}deg)`,
                  transformOrigin: 'center bottom',
                }}
              >
                <SegmentedTentacle
                  totalClicks={
                    creatureData.segmentsPerTentacle *
                    creatureData.segmentsType *
                    creatureData.essencePerSegment
                  }
                  bodyColor={actualSkin.skin.bodyColor}
                  suctionColor={actualSkin.skin.suckerColor}
                />
              </div>
            ))}
          </Eye>
        </div>
      </div>
    </div>
  ) : null;
};

export default memo(MiniCreature);
