import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { fetchCharacters } from '../../services/service';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockCharacters } from '../../tests/mockData';
import { BrowserRouter } from 'react-router';

vi.mock('./style.css', () => ({}));

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
    render(
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    );
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
    render(
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch characters')
      ).toBeInTheDocument();
      expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
    });
  });

  it('should have search query in localstorage', async () => {
    render(
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    );
    const search = screen.getByPlaceholderText(/search.../i);
    await userEvent.type(search, 'Rick{enter}');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('lastSearch', 'Rick');
  });
});
