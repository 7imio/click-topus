import { FC, useEffect, useState } from 'react';
import { getGradientFromColor } from '../../helpers/color-utils';
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
  const [colorGradientFactor, setColorGradientFactor] = useState<number>();
  useEffect(() => {
    setColorGradientFactor(Math.random());
  }, []);

  return (
    <div
      className={`tentacle origin-top animate-tentacle translate-y-4`}
      style={{
        background: getGradientFromColor(bodyColor, colorGradientFactor),
      }}
    >
      {[...Array(suctionCount)].map((_, i) => (
        <Sucker key={i} color={suctionColor} />
      ))}
    </div>
  );
};

export default Tentacle;
