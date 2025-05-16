import { Capacity } from './Capacity';

export interface Country {
  name: string;
  ISO_A2: string;
  ISO_A3?: string;
  population: number;
  defensePotential: number;
  capacities: Capacity[];
  indoctrinationLevel?: number;
  isConquered?: boolean;
}
