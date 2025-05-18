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
      const { iso, essenceSpent } = action.payload;
      const country = state.countries.find((c) => c.ISO_A2 === iso);
      if (!country || country.isConquered) return;

      country.indoctrinationLevel = (country.indoctrinationLevel ?? 0) + essenceSpent;
      if (country.indoctrinationLevel >= country.population) {
        // Set as conquered
        countrySlice.caseReducers.markCountryAsConquered(state, {
          type: 'countries/markCountryAsConquered',
          payload: country.ISO_A2,
        });
      }
    },

    markCountryAsConquered: (state, action: PayloadAction<string>) => {
      const country = state.countries.find((c) => c.ISO_A2 === action.payload);
      if (!country || country.isConquered) return;
      country.isConquered = true;
      country.indoctrinationLevel = country.population;
      state.victories += 1;
    },

    decayIndoctrination: (state, action: PayloadAction<string>) => {
      const country = state.countries.find((c) => c.ISO_A2 === action.payload);
      if (!country) return;
      if (country.isConquered) return;
      if (country.indoctrinationLevel === undefined) return;
      country.indoctrinationLevel = Math.max(country.indoctrinationLevel - country.defensePotential, 0);
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
  decayIndoctrination,
  hydrate,
  resetCountries,
} = countrySlice.actions;
export default countrySlice.reducer;
