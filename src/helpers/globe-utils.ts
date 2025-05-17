// src/data/countries.ts
import { Country } from '../types/Country';

export const getCountriesWithColors = (countries: Country[]) => {
  return countries.map((country: any) => {
    const { defensePotential } = country;

    const red = Math.min(255, defensePotential * 2);
    const green = 255 - red;
    const baseColor = `rgb(${red}, ${green}, 50)`;

    return {
      ...country,
      color: baseColor,
    };
  });
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [68, 68, 68]; // fallback gris
};
