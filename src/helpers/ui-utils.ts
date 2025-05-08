import { getExponentialGrowth } from './math-utils';

export const getNextEssencePerSegment = (current: number, created: number) =>
  Math.floor(current + getExponentialGrowth(created));
