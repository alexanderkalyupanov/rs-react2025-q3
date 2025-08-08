import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMockStore } from '../../tests/mockData';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { charactersApi } from '../../services/service';

vi.mock('./style.css', () => ({}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

describe('App component', () => {
  const store = createMockStore({
    selectedItems: { selectedCharacters: [] },
    characters: { selectedCharactersData: [] },
  });

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

  it('should display characters if request success', async () => {
    store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({ query: '', page: 1 })
    );

    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-box')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  // it('should show error when fetch fails', async () => {
  //   store.dispatch(
  //     charactersApi.endpoints.getCharacters.initiate({ query: 'jfjfjfjfjjfjd', page: 1 })
  //   );

  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
  //   });
  // });

  it('should have search query in localstorage', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const search = screen.getByPlaceholderText(/search.../i);
    await userEvent.type(search, 'Rick{enter}');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('lastSearch', 'Rick');
  });
});
