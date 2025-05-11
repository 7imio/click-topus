import { FC, useEffect, useState } from 'react';
import useEssenceIncrement from '../../hooks/useEssenceIncrement';
import { useAppSelector } from '../../store/hooks';
import MiniCreature from '../background/MiniCreature';
import Eye from '../creatures/Eye';
import SegmentedTentacle from '../creatures/SegmentedTentacle';
import AutoClickerPrompt from '../ui/AutoClickerPrompt';
import { Creature } from '../../store/slices/creatureSlice';
import Informations from '../ui/menu/Informations';

export interface Tentacles {
  id: string;
  essence: number; // MAX 200
}

const Abyss: FC = () => {
  const { totalHarvestedEssence } = useAppSelector((state) => state.essence);
  const { currentSkin } = useAppSelector((state) => state.skin);
  const { maxTentacles, creatures } = useAppSelector(
    (state) => state.creatures
  );

  const [creatureList, setCreatureList] = useState<Creature[]>();

  useEffect(() => {
    setCreatureList(creatures?.slice(-10));
  }, [creatures]);

  const { DEBUG } = useAppSelector((state) => state.debug);

  const tentacles = useAppSelector((state) => state.tentacles.tentacles);
  const angleStep = 360 / maxTentacles;

  const handleClick = useEssenceIncrement();

  return (
    <>
      <h1 className="text-4xl font-bold text-purple-500 z-50 text-shadow">
        Essence: {totalHarvestedEssence}
      </h1>

      {DEBUG && <Informations isPanel={true} />}

      <AutoClickerPrompt />
      <div className="relative w-full h-[600px] aspect-square">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Eye skin={currentSkin.skin} handleClick={handleClick} blink={true}>
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
        {creatureList?.map((creature) => <MiniCreature creature={creature} />)}
      </div>
    </>
  );
};

export default Abyss;
