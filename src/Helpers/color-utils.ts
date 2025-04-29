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
