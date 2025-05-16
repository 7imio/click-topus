import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeCountries } from '../store/slices/countrySlice';
import rawCountryData from '../data/countries/coutriesData.json'; // Ton fichier JSON brut

export const useInitializeCountries = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state) => state.countries.isInitialized
  );

  useEffect(() => {
    if (!isInitialized) {
      const parsedCountries = rawCountryData.map((country: any) => ({
        ...country,
        indoctrinationLevel: 0,
        isConquered: false,
      }));

      dispatch(initializeCountries(parsedCountries));
    }
  }, [isInitialized, dispatch]);
};
