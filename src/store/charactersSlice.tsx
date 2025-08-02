import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  type: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: Array<string>;
  url: string;
  created: string;
}
interface charactersState {
  selectedCharactersData: Character[];
}

const initialState: charactersState = {
  selectedCharactersData: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addSelectedCharacterData: (state, action: PayloadAction<Character>) => {
      if (
        !state.selectedCharactersData.some(
          (item) => item.id === action.payload.id
        )
      ) {
        state.selectedCharactersData.push(action.payload);
      }
    },
    removeSelectedCharacterData: (state, action: PayloadAction<number>) => {
      state.selectedCharactersData = state.selectedCharactersData.filter(
        (item) => item.id !== action.payload
      );
    },
    clearAllSelectedCharactersData: (state) => {
      state.selectedCharactersData = [];
    },
  },
});

export const {
  addSelectedCharacterData,
  removeSelectedCharacterData,
  clearAllSelectedCharactersData,
} = charactersSlice.actions;
export const selectSelectedCharacters = (state: RootState) =>
  state.characters.selectedCharactersData;

export default charactersSlice.reducer;
