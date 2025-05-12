import { SkinColor } from './Skin';
import { Capacity } from './Capacity';

export interface Creature {
  creatureId: string;
  creatureName: string;
  essence: number;
  skin: SkinColor;
  skills?: Capacity[];
}
