import { FC, useState } from 'react';
import Eye from './Eye';
import SegmentedTentacle from './SegmentedTentacle';
import Bubbles from './Bubbles';
import { MAX_TENTACLES, SEGMENTS_PER_TENTACLE } from '../constants/tentacles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment } from '../store/slices/essenceSlice';

export interface Tentacles {
  id: string;
  essence: number; // MAX 200
}

const Abyss: FC = () => {
  const dispatch = useAppDispatch();
  const { essence } = useAppSelector((state) => state.essence);

  const handleClick = () => {
    onEssenceIncrement();
  };

  const [tentacles, setTentacles] = useState<Tentacles[]>([
    {
      id: crypto.randomUUID(),
      essence: 0,
    },
  ]);
  const angleStep = tentacles.length ? 360 / tentacles.length : 0;

  const onEssenceIncrement = () => {
    // Increment first tentacle;
    setTentacles((prevTentacle) => {
      const newTentacles = [...prevTentacle];

      for (let i = 0; i < newTentacles.length; i++) {
        if (newTentacles[i].essence < 200) {
          newTentacles[i] = {
            ...newTentacles[i],
            essence: newTentacles[i].essence + 1,
          };
          break;
        }
      }
      const last = newTentacles[newTentacles.length - 1];
      if (
        last.essence === SEGMENTS_PER_TENTACLE * 2 && // segments AND suckers
        newTentacles.length < MAX_TENTACLES
      ) {
        newTentacles.push({
          id: crypto.randomUUID(),
          essence: 0,
        });
      }
      return newTentacles;
    });
    // when tentacle reach 200 essence, add another tentacle.
    // do it until we have 8 full tentacles;
    dispatch(increment());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-green-900 to-gray-900">
      <h1 className="text-4xl font-bold text-purple-800">Essence: {essence}</h1>
      <Bubbles />
      <div className="relative w-[600px] h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Eye
            irisColor="#6633cc"
            tentacleColor="#00cc66"
            handleClick={handleClick}
          >
            {tentacles.map((tentacle, idx) => (
              <div
                key={tentacle.id}
                onClick={handleClick}
                className="absolute top-[50%] left-[40%]"
                style={{
                  transform: `rotate(${idx * angleStep}deg)`,
                  transformOrigin: 'top center',
                }}
              >
                <SegmentedTentacle
                  totalClicks={tentacle.essence}
                  bodyColor="#00cc66"
                  suctionColor="#9900cc"
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
