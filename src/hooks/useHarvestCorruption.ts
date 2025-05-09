import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { incrementCorruption } from '../store/slices/corruptionSlice';

const useHarvestCorruption = () => {
  const { creatures } = useAppSelector((state) => state.creatures);
  const dispatch = useAppDispatch();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    clearIntervalRef();

    const creaturesCreated = creatures?.length;
    if (!creaturesCreated || creaturesCreated <= 0) return;

    const intervalDuration = 1000 / creaturesCreated;

    intervalRef.current = setInterval(() => {
      dispatch(incrementCorruption());
    }, intervalDuration);

    return () => clearIntervalRef();
  }, [creatures]);
};

export default useHarvestCorruption;
