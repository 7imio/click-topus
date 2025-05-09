import { FC, ReactNode, useEffect, useState } from 'react';
import { getGradientFromColor } from '../../helpers/color-utils';

type TentacleSegmentProps = {
  bodyColor: string;
  children?: ReactNode;
  index?: number;
};

export const TentacleSegment: FC<TentacleSegmentProps> = ({
  bodyColor,
  index,
  children,
}) => {
  const animationDelay = index ? index * 200 : 200;

  const style = {
    background: getGradientFromColor(bodyColor),
    animationName: 'sucker-pop, wiggle',
    animationDuration: '0.6s, 2s',
    animationTimingFunction: 'ease-out, ease-in-out',
    animationDelay: `0s, ${animationDelay}ms`,
    animationIterationCount: '1, infinite',
    animationFillMode: 'forwards',
  };

  return (
    <div className={`tentacle-segment`} style={style}>
      {children}
    </div>
  );
};

export default TentacleSegment;
