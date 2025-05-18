import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { decayIndoctrination } from '../store/slices/countrySlice';

const TICK_INTERVAL = 1000; // 1 seconde

const useDecayIndoctrination = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const { ongoingAttack } = useAppSelector((state) => state.attacks);

  useEffect(() => {
    const interval = setInterval(() => {
      countries.forEach((c) => {
        const isOnAttack = ongoingAttack.some((ack) => ack.countryId === c.ISO_A2);
        if (isOnAttack) return;
        dispatch(decayIndoctrination(c.ISO_A2));
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [countries, ongoingAttack, dispatch]);
};

export default useDecayIndoctrination;
