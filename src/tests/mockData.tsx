import { configureStore } from '@reduxjs/toolkit';
import type { Character } from '../components/cardItem/CardItem';
import charactersSlice, {
  type charactersState,
} from '../store/charactersSlice';
import selectedItemsSlice, {
  type SelectedItemsState,
} from '../store/selectedItemsSlice';
import { charactersApi } from '../services/service';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    origin: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
];

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};
const emptyCharacter: Character = {
  id: 2,
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  image: '',
  origin: { name: '', url: '' },
  location: { name: '', url: '' },
  episode: [],
  url: '',
  created: '',
};

export interface AppState {
  selectedItems: SelectedItemsState;
  characters: charactersState;
}

type MockStoreType = ReturnType<typeof createMockStore>;

const createMockStore = (preloadedState: AppState) => {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsSlice,
      characters: charactersSlice,
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });
};

const mockStore: MockStoreType = createMockStore({
  selectedItems: { selectedCharacters: [] },
  characters: { selectedCharactersData: [] },
});

export {
  mockCharacter,
  mockCharacters,
  emptyCharacter,
  createMockStore,
  mockStore,
};
