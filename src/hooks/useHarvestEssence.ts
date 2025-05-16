import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import useEssenceIncrement from './useEssenceIncrement';

const useHarvestEssence = () => {
  const { speed, click } = useAppSelector((state) => state.autoClicker);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incrementEssence = useEssenceIncrement(click);
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (speed <= 0) return;

    const intervalDuration = 1000 / speed;
    intervalRef.current = setInterval(() => {
      incrementEssence();
    }, intervalDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [speed, click, incrementEssence]);
};

export default useHarvestEssence;
