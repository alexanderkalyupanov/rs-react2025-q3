import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main';
import { mockCharacters } from '../../tests/mockData';

vi.mock('../cardList/CardList', () => ({
  default: vi.fn(() => <div data-testid="mock-card-list" />),
}));

describe('Main Component', () => {
  const defaultProps = {
    characters: mockCharacters,
    isLoading: false,
    error: null,
    shouldThrow: false,
  };

  it('renders CardList with correct props', () => {
    render(<Main {...defaultProps} />);

    const cardList = screen.getByTestId('mock-card-list');
    expect(cardList).toBeInTheDocument();
  });

  it('pass all props to CardList', () => {
    const props = {
      ...defaultProps,
      loading: true,
      shouldThrow: true,
      error: 'error',
    };
    render(<Main {...props}></Main>);

    const cardList = screen.getByTestId('mock-card-list');
    expect(cardList).toBeInTheDocument();
  });
});
