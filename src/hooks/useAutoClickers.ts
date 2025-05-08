import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import useEssenceIncrement from './useEssenceIncrement';

const useAutoClickers = () => {
  const { count, click } = useAppSelector((state) => state.autoClicker);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incrementEssence = useEssenceIncrement();
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (count <= 0) return;

    const intervalDuration = 1000 / count;
    intervalRef.current = setInterval(() => {
      for (let i = 0; i < click; i++) {
        incrementEssence();
      }
    }, intervalDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [count, click, incrementEssence]);
};

export default useAutoClickers;
