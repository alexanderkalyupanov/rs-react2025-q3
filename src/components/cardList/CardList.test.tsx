import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, test, expect, vi } from 'vitest';
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
              error={null}
              shouldThrow={false}
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
              error={null}
              shouldThrow={false}
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
              error={null}
              shouldThrow={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByTestId('loading-box')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toHaveClass('animate-spin');
    });
    test('unshow loading spinner', () => {
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[]}
              isLoading={false}
              error={null}
              shouldThrow={false}
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
              error={null}
              shouldThrow={false}
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
              error={null}
              shouldThrow={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });

  describe('error tests', () => {
    test('display error message', () => {
      const errorMessage = 'Failed to fetch characters';
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <CardList
              characters={[]}
              isLoading={false}
              error={errorMessage}
              shouldThrow={false}
              {...defaultProps}
            ></CardList>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
    });
  });

  describe('Error boundary trigger', () => {
    test('throws error when shouldThrow is true', () => {
      const originalError = console.error;
      console.error = vi.fn();
      expect(() =>
        render(
          <Provider store={mockStore}>
            <MemoryRouter>
              <CardList
                characters={mockCharacters}
                isLoading={false}
                error={null}
                shouldThrow={true}
                {...defaultProps}
              />
            </MemoryRouter>
          </Provider>
        )
      ).toThrow('Test error triggered by button');
      console.error = originalError;
    });
  });
});
