import { FC } from 'react';
import TentacleSegment from './TentacleSegment';
import Sucker from './Sucker';
import { SEGMENTS_PER_TENTACLE } from '../constants/tentacles';

type SegmentedTentacleProps = {
  totalClicks: number;
  bodyColor: string;
  suctionColor: string;
};

export const SegmentedTentacle: FC<SegmentedTentacleProps> = ({
  totalClicks,
  bodyColor,
  suctionColor,
}) => {
  const maxSegments = SEGMENTS_PER_TENTACLE;
  const segmentCount = Math.min(Math.floor(totalClicks / 10), maxSegments);

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {[...Array(segmentCount)].map((_, index) => {
        const hasSucker = totalClicks >= (index + 1) * 20; // 10 pour segment + 10 pour sucker
        return (
          <TentacleSegment key={index} index={index} bodyColor={bodyColor}>
            {hasSucker && <Sucker color={suctionColor} />}
          </TentacleSegment>
        );
      })}
    </div>
  );
};

export default SegmentedTentacle;
