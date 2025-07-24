import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { mockCharacters } from '../../tests/mockData';

describe('CardList Component', () => {
  describe('render tests', () => {
    test('render items', () => {
      render(
        <CardList
          characters={mockCharacters}
          isLoading={false}
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
          isLoading={false}
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
          isLoading={true}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.getByTestId('loading-box')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toHaveClass('animate-spin');
    });
    test('unshow loading spinner', () => {
      render(
        <CardList
          characters={[]}
          isLoading={false}
          error={null}
          shouldThrow={false}
        ></CardList>
      );
      expect(screen.queryByTestId('loading-box')).toBeNull();
      expect(screen.queryByTestId('loading')).toBeNull();
    });
  });

  describe('correct display data characters', () => {
    test('correctly display item name and description', () => {
      render(
        <CardList
          characters={mockCharacters}
          isLoading={false}
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
          isLoading={false}
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
          isLoading={false}
          error={errorMessage}
          shouldThrow={false}
        ></CardList>
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
          <CardList
            characters={mockCharacters}
            isLoading={false}
            error={null}
            shouldThrow={true}
          />
        )
      ).toThrow('Test error triggered by button');
      console.error = originalError;
    });
  });
});
