import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { incrementFervor } from '../store/slices/fervorSlice';

const useHarvestFervor = () => {
  const { count: fervorCount } = useAppSelector((state) => state.fervor);

  const dispatch = useAppDispatch();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    clearIntervalRef();
    if (!fervorCount || fervorCount <= 0) return;
    const intervalDuration = 1000 / fervorCount;
    intervalRef.current = setInterval(() => {
      dispatch(incrementFervor());
    }, intervalDuration);
    return () => clearIntervalRef();
  }, [fervorCount]);
};

export default useHarvestFervor;
