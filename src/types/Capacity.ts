export enum CapacityType {
  DEFENSE = 'defense', // Défense militaire ou résistance mentale
  INFLUENCE = 'influence', // Propagation d'idéologies, contrôle mental, etc.
}

export interface Capacity {
  id: string;
  name: string;
  description: string;
  type: CapacityType;
  toughnesses: string;
  weaknesses: string;
  incompatibilities?: string[];
}
