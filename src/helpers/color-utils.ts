export const getGradientFromColor = (
  hex: string,
  factor: number = 0.7
): string => {
  const darker = darkenHex(hex, factor);
  return `linear-gradient(to top, ${hex}, ${darker})`;
};
export const darkenHex = (color: string, factor: number = 0.8) => {
  const r = Math.max(0, Math.floor(parseInt(color.slice(1, 3), 16) * factor));
  const g = Math.max(0, Math.floor(parseInt(color.slice(3, 5), 16) * factor));
  const b = Math.max(0, Math.floor(parseInt(color.slice(5, 7), 16) * factor));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export enum ColorShift {
  DARKER = 'darker',
  BRIGHTER = 'brighter',
}

export function shiftHexColor(
  hex: string,
  mode: ColorShift,
  intensity: number
): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, val));

  // Nettoie le # si présent
  hex = hex.replace(/^#/, '');
  if (hex.length !== 6) throw new Error('Invalid hex color');

  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  const factor = mode === ColorShift.BRIGHTER ? 1 + intensity : 1 - intensity;

  r = clamp(Math.round(r * factor));
  g = clamp(Math.round(g * factor));
  b = clamp(Math.round(b * factor));

  const newHex =
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

  return newHex;
}
