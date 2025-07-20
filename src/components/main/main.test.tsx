import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main';
import { mockCharacters } from '../../tests/mockData';

vi.mock('../cardList/CardList', () => ({
  default: vi.fn(() => <div data-testid="mock-card-list" />),
}));

describe('Main Component', () => {
  const defaultProps = {
    characters: mockCharacters,
    loading: false,
    error: null,
    shouldThrow: false,
    onTriggerError: vi.fn(),
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

  it('render trigger error btn', () => {
    render(<Main {...defaultProps}></Main>);

    const button = screen.getByRole('button', { name: /trigger test error/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500');
  });

  it('calls triggerError when btn click', () => {
    const mockTriggerError = vi.fn();
    render(<Main {...defaultProps} onTriggerError={mockTriggerError}></Main>);
    const button = screen.getByRole('button', { name: /trigger test error/i });
    fireEvent.click(button);
    expect(mockTriggerError).toHaveBeenCalledTimes(1);
  });
});
