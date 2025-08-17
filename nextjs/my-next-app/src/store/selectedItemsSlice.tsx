import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedCharacters: number[];
}

const initialState: SelectedItemsState = {
  selectedCharacters: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleCharacterSelected: (state, action: PayloadAction<number>) => {
      const characterId = action.payload;
      const index = state.selectedCharacters.indexOf(characterId);
      if (index === -1) {
        state.selectedCharacters.push(characterId);
      } else {
        state.selectedCharacters.splice(index, 1);
      }
    },
    clearAllSelected: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleCharacterSelected, clearAllSelected } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
