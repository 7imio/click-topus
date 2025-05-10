import * as am5 from '@amcharts/amcharts5';

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getColorByPotential = (potential: number) => {
  const factor = clamp(potential, 0, 100) / 100;

  const startColor = { r: 0x10, g: 0xb9, b: 0x81 }; // Vert abysse
  const endColor = { r: 0x99, g: 0x1b, b: 0x1b }; // Rouge sombre

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

  return am5.color((r << 16) + (g << 8) + b);
};
