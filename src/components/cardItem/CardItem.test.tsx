import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardItem from './CardItem';
import { describe, test, expect } from 'vitest';
import { emptyCharacter, mockCharacter } from '../../tests/mockData';
import { MemoryRouter } from 'react-router';

describe('CardItem tests', () => {
  test('render name and description character', () => {
    render(
      <MemoryRouter>
        <CardItem character={mockCharacter} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('character-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-purple-500');

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    const speciesElement = screen.getByText(/Species:/i).closest('p');
    expect(speciesElement).toHaveTextContent(
      `Species: ${mockCharacter.species}`
    );
    const genderElement = screen.getByText(/Gender:/i).closest('p');
    expect(genderElement).toHaveTextContent(`Gender: ${mockCharacter.gender}`);
    const statusElement = screen.getByText(/Status:/i).closest('p');
    expect(statusElement).toHaveTextContent(`Status: ${mockCharacter.status}`);
  });

  test('missing props characters', () => {
    render(
      <MemoryRouter>
        <CardItem character={emptyCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('character-card')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading').textContent).toBe('');
  });
});
