import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main';
import { mockCharacters } from '../../tests/mockData';
import { BrowserRouter } from 'react-router';

vi.mock('../cardList/CardList', () => ({
  default: vi.fn(() => <div data-testid="mock-card-list" />),
}));

describe('Main Component', () => {
  const defaultProps = {
    characters: mockCharacters,
    isLoading: false,
    error: null,
    shouldThrow: false,
    currentPage: 1,
    totalPages: 3,
    searchQuery: '',
  };

  it('renders CardList with correct props', () => {
    render(
      <BrowserRouter>
        <Main {...defaultProps} />
      </BrowserRouter>
    );

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
    render(
      <BrowserRouter>
        <Main {...props} />
      </BrowserRouter>
    );

    const cardList = screen.getByTestId('mock-card-list');
    expect(cardList).toBeInTheDocument();
  });
});
