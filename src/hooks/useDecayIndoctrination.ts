import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { incrementIndoctrination } from '../store/slices/countrySlice';

const TICK_INTERVAL = 1000; // 1 seconde

const useDecayIndoctrination = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const { ongoingAttack } = useAppSelector((state) => state.attacks);

  useEffect(() => {
    const interval = setInterval(() => {
      countries.forEach((country) => {
        const isUnderAttack = ongoingAttack.some(
          (a) => a.countryId === country.ISO_A2 && a.isActive
        );

        if (
          !isUnderAttack &&
          country.indoctrinationLevel &&
          country.indoctrinationLevel > 0
        ) {
          const decayAmount = country.defensePotential;
          // const newLevel = Math.max(
          //   country.indoctrinationLevel - decayAmount,
          //   0
          // );

          dispatch(
            incrementIndoctrination({
              iso: country.ISO_A2,
              essenceSpent: -decayAmount, // Valeur négative pour diminuer l'indoctrination
            })
          );
        }
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [countries, ongoingAttack, dispatch]);
};

export default useDecayIndoctrination;
