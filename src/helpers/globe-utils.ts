// src/data/countries.ts
import { Country } from '../types/Country';

export const getCountriesWithColors = (countries: Country[]) => {
  return countries.map((country: any) => {
    const { defensePotential } = country;

    const red = Math.min(255, defensePotential * 2);
    const green = 255 - red;
    const color = `rgb(${red}, ${green}, 50)`;

    return {
      ...country,
      color,
    };
  });
};
