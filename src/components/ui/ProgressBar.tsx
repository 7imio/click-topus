import { FC, useEffect, useState } from 'react';

interface ProgressBarProps {
  indoctrinationLevel?: number;
  population: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  indoctrinationLevel,
  population,
}) => {
  const [color, setColor] = useState<string>('');
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (population === 0) {
      setColor('bg-green-500');
      setValue(100);
      return;
    } else {
      setValue((indoctrinationLevel ?? 0 / population) * 100);
      const newColor =
        value > 50
          ? 'bg-green-500'
          : value > 20
            ? 'bg-yellow-500'
            : 'bg-red-500';
      setColor(newColor);
    }
  }, [population, indoctrinationLevel]);

  return (
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div
        className={`${color} h-3 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
