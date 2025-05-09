import { FC, useState } from 'react';
import TentacleSegment from './TentacleSegment';
import Sucker from './Sucker';
import useEssenceHelper from '../../hooks/useEssenceHelper';
import { useAppSelector } from '../../store/hooks';
import { CreatureState } from '../../store/slices/creatureSlice';

type SegmentedTentacleProps = {
  totalClicks: number;
  bodyColor: string;
  suctionColor: string;
  debug?: boolean; // ✅ quick dev / test mode
};

export const SegmentedTentacle: FC<SegmentedTentacleProps> = ({
  totalClicks,
  bodyColor,
  suctionColor,
  debug = false,
}) => {
  const globalCreature = useAppSelector((state) => state.creatures);
  const [creature] = useState<
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

  const suckerStep = creature.essencePerSegment * creature.segmentsType;

  const segmentCount = Math.min(
    Math.floor(totalClicks / creature.essencePerSegment),
    creature.segmentsPerTentacle
  );

  const { essencePerTentacle } = useEssenceHelper();

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {[...Array(segmentCount)].map((_, index) => {
        const hasSucker = totalClicks >= (index + 1) * suckerStep;
        return (
          <TentacleSegment key={index} bodyColor={bodyColor}>
            {hasSucker && <Sucker color={suctionColor} />}
          </TentacleSegment>
        );
      })}
      {/* Debug */}
      {debug && (
        <div className="text-xs text-white mt-1">
          {totalClicks}/{essencePerTentacle} essence
        </div>
      )}
    </div>
  );
};

export default SegmentedTentacle;
