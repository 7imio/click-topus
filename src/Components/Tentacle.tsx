import { FC } from 'react';
import Sucker from './Sucker';

type TentacleProps = {
  suctionCount: number;
  bodyColor: string;
  suctionColor: string;
};

export const Tentacle: FC<TentacleProps> = ({
  suctionCount,
  bodyColor,
  suctionColor,
}) => {
  return (
    <div
      className="tentacle origin-top animate-tentacle translate-y-4"
      style={{ background: bodyColor }}
    >
      {[...Array(suctionCount)].map((_, i) => (
        <Sucker key={i} color={suctionColor} />
      ))}
    </div>
  );
};

export default Tentacle;
