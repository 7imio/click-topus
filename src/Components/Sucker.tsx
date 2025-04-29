import { FC } from 'react';
import { getGradientFromColor } from '../Helpers/color-utils';

type SuckerProps = {
  color: string;
};

export const Sucker: FC<SuckerProps> = ({ color }) => {
  return (
    <div
      className="suction animate-sucker-pop"
      style={{ background: getGradientFromColor(color) }}
    ></div>
  );
};

export default Sucker;
