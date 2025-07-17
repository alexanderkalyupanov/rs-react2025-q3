import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, test, expect } from 'vitest';
import type { Character } from '../cardItem/CardItem';
import '@testing-library/jest-dom';

describe('CardList Component', () => {
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

  describe('render tests', () => {
    test('render items', () => {
      render(
        <CardList
          characters={mockCharacters}
          loading={false}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      const items = screen.getAllByTestId('character-card');
      expect(items).toHaveLength(2);
    });

    test('display no results comment', () => {
      render(
        <CardList
          characters={[]}
          loading={false}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByText('No characters found')).toBeInTheDocument();
    });

    test('show loading spinner', () => {
      render(
        <CardList
          characters={[]}
          loading={true}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toHaveClass('animate-spin');
    });
  });

  describe('correct display data characters', () => {
    test('correctly display item name and description', () => {
      render(
        <CardList
          characters={mockCharacters}
          loading={false}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    test('missing data', () => {
      const misCharacter = {
        id: 3,
        name: 'Unknown',
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
      render(
        <CardList
          characters={[misCharacter]}
          loading={false}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });

  describe('error tests', () => {
    test('display error message', () => {
      const errorMessage = 'Failed to fetch characters';
      render(
        <CardList
          characters={[]}
          loading={false}
          error={errorMessage}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
    });
  });
});
