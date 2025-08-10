import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Header Component', () => {
  const mockProps = {
    isLoading: false,
    searchQuery: '',
    onSearch: vi.fn(),
    currentPage: 1,
  };

  describe('render test', () => {
    it('should render correctly', () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Header {...mockProps} />
          </Provider>
        </BrowserRouter>
      );

      expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});
