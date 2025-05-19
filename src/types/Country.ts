import { Capacity } from './Capacity';

export interface Country {
  name: string;
  ISO_A2: string;
  ISO_A3?: string;
  population: number;
  defensePotential: number;
  capacities: Capacity[];
  weaknesses?: string[];
  toughnesses?: string[];
  indoctrinationLevel?: number;
  isConquered?: boolean;
}

export interface CountryRaw {
  name: string;
  ISO_A2: string;
  ISO_A3?: string;
  population: number;
  defensePotential: number;
  capacities: string[];
  indoctrinationLevel?: number;
  isConquered?: boolean;
}
