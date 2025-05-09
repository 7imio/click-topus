import { FC, ReactNode } from 'react';
import { getGradientFromColor } from '../../helpers/color-utils';

type TentacleSegmentProps = {
  bodyColor: string;
  children?: ReactNode;
};

export const TentacleSegment: FC<TentacleSegmentProps> = ({
  bodyColor,
  children,
}) => {
  return (
    <div
      className="tentacle-segment animate-sucker-pop"
      style={{
        background: getGradientFromColor(bodyColor),
        // animationDelay: `${index * 100}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default TentacleSegment;
