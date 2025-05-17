import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '../../types/Country';

export interface CountryState {
  countries: Country[];
  isInitialized: boolean;
  victories: number;
}

const initialState: CountryState = {
  countries: [],
  isInitialized: false,
  victories: 0,
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    initializeCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
      state.isInitialized = true;
    },
    incrementIndoctrination: (
      state,
      action: PayloadAction<{
        iso: string;
        essenceSpent: number;
      }>
    ) => {
      const country = state.countries.find(
        (c) => c.ISO_A2 === action.payload.iso
      );
      if (country && !country.isConquered) {
        const effectiveEssence = action.payload.essenceSpent;
        if (country.indoctrinationLevel === undefined) {
          country.indoctrinationLevel = 0;
        }
        country.indoctrinationLevel += effectiveEssence;

        if (country.indoctrinationLevel >= country.population) {
          country.isConquered = true;
          country.indoctrinationLevel = country.population;
        }
      }
    },
    markCountryAsConquered: (state, action: PayloadAction<string>) => {
      const country = state.countries.find((c) => c.ISO_A2 === action.payload);
      if (country && !country.isConquered) {
        country.isConquered = true;
        country.indoctrinationLevel = country.population;
        state.victories += 1;
      }
    },
    resetCountries: (state) => {
      state.countries = initialState.countries;
      state.isInitialized = false;
      state.victories = 0;
    },
    hydrate: (_state, action: PayloadAction<CountryState>) => {
      return action.payload;
    },
  },
});

export const {
  initializeCountries,
  incrementIndoctrination,
  markCountryAsConquered,
  hydrate,
  resetCountries,
} = countrySlice.actions;
export default countrySlice.reducer;
