import skins from '../data/skins.json' assert { type: 'json' };
import { Skin } from '../store/slices/skinSlice';

export const allSkins: Skin[] = skins;
