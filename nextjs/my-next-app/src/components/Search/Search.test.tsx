import SearchComponent from './Search';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

const mockLocalStorage = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || '';
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    mockOnSearch.mockClear();
  });

  describe('rendering', () => {
    it('render search component', () => {
      expect(
        render(
          <SearchComponent
            isLoading={false}
            searchQuery=""
            onSearch={mockOnSearch}
          ></SearchComponent>
        )
      );
    });

    it('render search input and button', () => {
      render(
        <SearchComponent
          isLoading={false}
          searchQuery=""
          onSearch={mockOnSearch}
        ></SearchComponent>
      );
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');

      const button = screen.getByRole('button', { name: /search/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Search');
    });

    it('display saved search query from localstorage', () => {
      window.localStorage.setItem('searchQuery', 'котики');
      render(
        <SearchComponent
          isLoading={false}
          searchQuery="котики"
          onSearch={mockOnSearch}
        ></SearchComponent>
      );
      expect(screen.getByDisplayValue('котики')).toBeInTheDocument();
    });

    it('display empty localstorage', () => {
      window.localStorage.clear();
      render(
        <SearchComponent
          isLoading={false}
          searchQuery=""
          onSearch={mockOnSearch}
        ></SearchComponent>
      );
      expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
    });
  });

  describe('user testing', () => {
    it('update input value when user types', () => {
      render(
        <SearchComponent
          isLoading={false}
          onSearch={mockOnSearch}
          searchQuery=""
        ></SearchComponent>
      );
      const input = screen.getByPlaceholderText('Search...');
      fireEvent.change(input, { target: { value: 'query' } });
      expect(input).toHaveValue('query');
    });
    it('detete trims after button search click', () => {
      render(
        <SearchComponent
          isLoading={false}
          onSearch={mockOnSearch}
          searchQuery=""
        ></SearchComponent>
      );
      const input = screen.getByPlaceholderText('Search...');
      const button = screen.getByRole('button', { name: /search/i });
      fireEvent.change(input, { target: { value: '  new query  ' } });
      fireEvent.click(button);
      expect(mockOnSearch).toHaveBeenCalledWith('new query');
    });
  });

  it('saving query in localstorage', () => {
    render(
      <SearchComponent
        isLoading={false}
        searchQuery=""
        onSearch={mockOnSearch}
      ></SearchComponent>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'собаки' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchQuery')).toBe('"собаки"');
    expect(mockOnSearch).toHaveBeenCalledWith('собаки');
  });

  it('rewriting query in localstorage', () => {
    render(
      <SearchComponent
        isLoading={false}
        searchQuery="собаки"
        onSearch={mockOnSearch}
      ></SearchComponent>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'птицы' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchQuery')).toBe('"птицы"');
    expect(mockOnSearch).toHaveBeenCalledWith('птицы');
  });

  it('should disable button when loading', () => {
    render(
      <SearchComponent
        isLoading={true}
        searchQuery=""
        onSearch={mockOnSearch}
      />
    );
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
