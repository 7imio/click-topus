import { FC } from 'react';

type SuckerProps = {
  color: string;
};

export const Sucker: FC<SuckerProps> = ({ color }) => {
  return (
    <div
      className="suction animate-sucker-pop"
      style={{ background: color }}
    ></div>
  );
};

export default Sucker;
