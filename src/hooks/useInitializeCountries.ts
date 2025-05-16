import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeCountries } from '../store/slices/countrySlice';
import rawCountryData from '../data/countries/coutriesData.json'; // Ton fichier JSON brut
import rawCapacityData from '../data/skills/countrySkills.json'; // Ton fichier JSON brut
import { CountryRaw } from '../types/Country';
import { Capacity } from '../types/Capacity';

export const useInitializeCountries = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state) => state.countries.isInitialized
  );

  useEffect(() => {
    if (!isInitialized) {
      const parsedCountries = rawCountryData.map((country: CountryRaw) => {
        const { capacities } = country;

        const parsedCapacities = capacities.map(
          (capacity) =>
            rawCapacityData.find((c) => c.id === capacity) as Capacity
        );

        const toughnesses = parsedCapacities.map(
          (capacity) => capacity.toughnesses
        );
        const weaknesses = parsedCapacities.map(
          (capacity) => capacity.weaknesses
        );

        return {
          ...country,
          indoctrinationLevel: 0,
          isConquered: false,
          capacities: parsedCapacities,
          toughnesses: toughnesses.flat(),
          weaknesses: weaknesses.flat(),
        };
      });

      dispatch(initializeCountries(parsedCountries));
    }
  }, [isInitialized, dispatch]);
};
