import { FC, ReactNode } from 'react';
import { getGradientFromColor } from '../Helpers/color-utils';

type TentacleSegmentProps = {
  index: number; // pour calculer le delay
  bodyColor: string;
  children?: ReactNode;
};

export const TentacleSegment: FC<TentacleSegmentProps> = ({
  index,
  bodyColor,
  children,
}) => {
  return (
    <div
      className="tentacle-segment"
      style={{
        background: getGradientFromColor(bodyColor),
        animationDelay: `${index * 100}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default TentacleSegment;
