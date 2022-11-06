import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentInitialState, TDocument } from './document.types';

const initialState: DocumentInitialState = {
  lastUpdatedDocument: null,
  documents: []
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    newDocument: (state, action: PayloadAction<TDocument>) => {
      state.documents = [...state.documents, action.payload];
      state.lastUpdatedDocument = action.payload;
    }
  }
});

export const documentActions = documentSlice.actions;

export const documentReducer = documentSlice.reducer;