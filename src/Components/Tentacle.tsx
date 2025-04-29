import { FC, useEffect, useState } from 'react';
import Sucker from './Sucker';
import { getGradientFromColor } from '../Helpers/color-utils';

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
  const [factor, setFactor] = useState<number>();
  useEffect(() => {
    setFactor(Math.random());
    console.log(factor);
  }, []);

  return (
    <div
      className={`tentacle origin-top animate-tentacle translate-y-4`}
      style={{ background: getGradientFromColor(bodyColor, factor) }}
    >
      {[...Array(suctionCount)].map((_, i) => (
        <Sucker key={i} color={suctionColor} />
      ))}
    </div>
  );
};

export default Tentacle;
