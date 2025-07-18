import type { Character } from '../cardItem/CardItem';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { fetchCharacters } from '../../services/service';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('./style.css', () => ({}));
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

vi.mock('../../services/service', () => ({
  fetchCharacters: vi.fn().mockImplementation(() =>
    Promise.resolve({
      data: [],
      error: null,
    })
  ),
}));

const mockFetchCharacters = vi.mocked(fetchCharacters);

describe('App component', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    localStorageMock.getItem.mockImplementation((key) =>
      key === 'lastSearch' ? '' : null
    );
  });

  it('display character if request success', async () => {
    mockFetchCharacters.mockResolvedValueOnce({
      data: mockCharacters,
      error: null,
    });
    render(<App></App>);
    expect(screen.getByTestId('loading-box')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('should show error when fetch fail', async () => {
    mockFetchCharacters.mockResolvedValueOnce({
      data: null,
      error: 'Failed to fetch characters',
    });
    render(<App></App>);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch characters')
      ).toBeInTheDocument();
      expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
    });
  });

  it('should have search query in localstorage', async () => {
    render(<App></App>);
    const search = screen.getByPlaceholderText(/search.../i);
    await userEvent.type(search, 'Rick{enter}');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('lastSearch', 'Rick');
  });
});
