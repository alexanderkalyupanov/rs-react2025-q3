import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { BrowserRouter } from 'react-router';

describe('Header Component', () => {
  const mockProps = {
    isLoading: false,
    searchQuery: '',
    onSearch: vi.fn(),
  };

  describe('render test', () => {
    it('should render correctly', () => {
      render(
        <BrowserRouter>
          <Header {...mockProps} />
        </BrowserRouter>
      );

      expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});
