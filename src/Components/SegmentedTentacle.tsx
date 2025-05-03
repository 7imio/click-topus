import { FC } from 'react';
import TentacleSegment from './TentacleSegment';
import Sucker from './Sucker';
import { SEGMENTS_PER_TENTACLE, SEGMENTS_TYPE } from '../constants/tentacles';

type SegmentedTentacleProps = {
  totalClicks: number;
  bodyColor: string;
  suctionColor: string;
  debug?: boolean; // ✅ pour activer le mode dev/test rapide
};

const maxSegments = SEGMENTS_PER_TENTACLE;

export const SegmentedTentacle: FC<SegmentedTentacleProps> = ({
  totalClicks,
  bodyColor,
  suctionColor,
  debug = false,
}) => {
  const segmentStep = debug ? 1 : SEGMENTS_PER_TENTACLE;
  const suckerStep = debug ? 2 : SEGMENTS_PER_TENTACLE * SEGMENTS_TYPE;

  const segmentCount = Math.min(
    Math.floor(totalClicks / segmentStep),
    maxSegments
  );

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {[...Array(segmentCount)].map((_, index) => {
        const hasSucker = totalClicks >= (index + 1) * suckerStep;
        return (
          <TentacleSegment key={index} index={index} bodyColor={bodyColor}>
            {hasSucker && <Sucker color={suctionColor} />}
          </TentacleSegment>
        );
      })}
      {/* Debug / progression visuelle */}
      {debug ?? (
        <div className="text-xs text-white mt-1">{totalClicks}/200 essence</div>
      )}
    </div>
  );
};

export default SegmentedTentacle;
