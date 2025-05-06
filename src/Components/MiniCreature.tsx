import { FC, memo, useRef, useState } from 'react';
import { MAX_TENTACLES, SEGMENTS_PER_TENTACLE } from '../constants/creatures';
import Eye from './Eye';
import SegmentedTentacle from './SegmentedTentacle';

type MiniCreatureProps = {
  bodyColor: string;
  suckerColor: string;
  irisColor: string;
  index: number;
};

const MiniCreature: FC<MiniCreatureProps> = ({
  bodyColor,
  suckerColor,
  irisColor,
}) => {
  const angleStep = 360 / MAX_TENTACLES;

  const [size] = useState(20 + Math.random() * 10);

  const [actualSkin] = useState({
    bodyColor,
    suckerColor,
    irisColor,
  });

  const creatureRef = useRef<HTMLDivElement>(null);
  const [uuid] = useState(() => crypto.randomUUID());
  const [position] = useState(() => ({
    x: Math.floor(20 + Math.random() * (window.innerWidth - 20 * 2 - size)),
    y: Math.floor(20 + Math.random() * (window.innerHeight - 20 * 2 - size)),
  }));
  return (
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

        animationDuration: `${4 + Math.random() * 3}s`,
      }}
    >
      <div className="relative w-[100px] h-[100px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Eye
            irisColor={actualSkin.irisColor}
            tentacleColor={actualSkin.bodyColor}
          >
            {[...Array(MAX_TENTACLES)].map((_, idx) => (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${idx * angleStep}deg)`,
                  transformOrigin: 'center bottom',
                }}
              >
                <SegmentedTentacle
                  totalClicks={SEGMENTS_PER_TENTACLE * 2 * 10} // 200
                  bodyColor={actualSkin.bodyColor}
                  suctionColor={actualSkin.suckerColor}
                />
              </div>
            ))}
          </Eye>
        </div>
      </div>
    </div>
  );
};

export default memo(MiniCreature);
