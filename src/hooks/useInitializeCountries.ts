import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeCountries } from '../store/slices/countrySlice';
import rawCountryData from '../../../data/countries.json'; // Ton fichier JSON brut

export const useInitializeCountries = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state) => state.countries.isInitialized
  );

  useEffect(() => {
    if (!isInitialized) {
      // Si tu veux parser ou faire des vérifications avant, c'est ici
      const parsedCountries = rawCountryData.map((country: any) => ({
        ...country,
        indoctrinationLevel: 0,
        isConquered: false,
      }));

      dispatch(initializeCountries(parsedCountries));
    }
  }, [isInitialized, dispatch]);
};
