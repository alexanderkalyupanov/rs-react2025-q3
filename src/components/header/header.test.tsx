import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';

describe('Header Component', () => {
  const mockProps = {
    isLoading: false,
    searchQuery: '',
    onSearch: vi.fn(),
  };

  describe('render test', () => {
    it('render correct', () => {
      render(<Header {...mockProps}></Header>);
      expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
    });
  });
});
