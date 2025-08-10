import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { mockCharacters, mockStore } from '../../tests/mockData';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

describe('CardList Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    searchQuery: '',
  };
  describe('render tests', () => {
    test('render items', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={mockCharacters}
              isLoading={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      const items = screen.getAllByTestId('character-card');
      expect(items).toHaveLength(2);
    });

    test('display no results comment', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[]}
              isLoading={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText('No characters found')).toBeInTheDocument();
    });

    test('show loading spinner', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[]}
              isLoading={true}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      // expect(screen.getByTestId('loading-box')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toHaveClass('animate-spin');
    });
    test('unshow loading spinner', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[]}
              isLoading={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.queryByTestId('loading-box')).toBeNull();
      expect(screen.queryByTestId('loading')).toBeNull();
    });
  });

  describe('correct display data characters', () => {
    test('correctly display item name and description', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={mockCharacters}
              isLoading={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
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
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[misCharacter]}
              isLoading={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });
});
