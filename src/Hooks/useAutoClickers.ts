import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment } from '../store/slices/essenceSlice';
import useEssenceIncrement from './useEssenceIncrement';

const useAutoClickers = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.autoClicker.count);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incrementEssence = useEssenceIncrement();

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (count <= 0) return;

    const intervalDuration = Math.max(1000 / count, 50);
    intervalRef.current = setInterval(() => {
      incrementEssence();
    }, intervalDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [count, incrementEssence]);
};

export default useAutoClickers;
