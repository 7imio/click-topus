// src/data/countries.ts
import countriesData from '../data/countries/coutriesData.json';

export const getCountriesWithColors = () => {
  return countriesData.map((country: any) => {
    const { defensePotential } = country;

    const red = Math.min(255, defensePotential * 2);
    const green = 255 - red;
    const color = `rgb(${red}, ${green}, 100)`;

    return {
      ...country,
      color,
    };
  });
};
