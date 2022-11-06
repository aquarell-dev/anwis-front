import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Individual, IndividualInitialState } from './individual.types';

const initialState: IndividualInitialState = {
  currentSelectedIndividual: {
    id: 1,
    individual_entrepreneur: 'ИП Вася'
  },
  individuals: [
    {
      id: 1,
      individual_entrepreneur: 'ИП Вася'
    },
    {
      id: 2,
      individual_entrepreneur: 'Магомед'
    }
  ]
};

const individualSlice = createSlice({
  name: 'individual',
  initialState,
  reducers: {
    selectIndividual: (state, action: PayloadAction<Individual>) => {
      state.currentSelectedIndividual = action.payload;
    },
  }
});

export const individualActions = individualSlice.actions;

export const individualReducer = individualSlice.reducer;
