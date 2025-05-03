import { FC, memo } from 'react';
import {
  ColorShift,
  getGradientFromColor,
  shiftHexColor,
} from '../Helpers/color-utils';

type SuckerProps = {
  color: string;
};

export const Sucker: FC<SuckerProps> = ({ color }) => {
  return (
    <div
      className="suction animate-sucker-pop"
      style={{
        background: getGradientFromColor(color),
        boxShadow: `inset 0 0 0 4px ${shiftHexColor(color, ColorShift.DARKER, 0.5)}`,
      }}
    ></div>
  );
};

export default memo(Sucker);
