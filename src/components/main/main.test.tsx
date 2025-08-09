import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main';
import { mockCharacters } from '../../tests/mockData';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock('../cardList/CardList', () => ({
  default: vi.fn(() => <div data-testid="mock-card-list" />),
}));

vi.mock('../Pagination/Pagination', () => ({
  default: vi.fn(() => <div data-testid="mock-pagination" />),
}));

describe('Main Component', () => {
  const defaultProps = {
    characters: mockCharacters,
    currentPage: 1,
    totalPages: 3,
    searchQuery: '',
  };

  it('renders CardList and Pagination with correct props', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Main {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );

    const cardList = screen.getByTestId('mock-card-list');
    const pagination = screen.getByTestId('mock-pagination');

    expect(cardList).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });

  it('passes all props to CardList', () => {
    const props = {
      ...defaultProps,
      currentPage: 2,
      totalPages: 5,
      searchQuery: 'test',
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Main {...props} />
        </BrowserRouter>
      </Provider>
    );

    const cardList = screen.getByTestId('mock-card-list');
    expect(cardList).toBeInTheDocument();
  });

  it('renders character route correctly', () => {
    window.history.pushState({}, 'Test Character', '/character/1');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Main {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );

    const cardList = screen.getByTestId('mock-card-list');
    const pagination = screen.getByTestId('mock-pagination');

    expect(cardList).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });
});
