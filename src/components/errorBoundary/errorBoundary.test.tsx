import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './errorBoundary';
import '@testing-library/jest-dom';
import App from '../App/App';

vi.mock('../cardList/CardList', () => ({
  __esModule: true,
  default: ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) throw new Error('💥 CardList Error!');
    return <div>Mock CardList</div>;
  },
}));

describe('Error boundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children error boundary', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders fallback UI', () => {
    render(<App></App>);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    const triggerBtn = screen.getByRole('button', {
      name: /trigger test error/i,
    });
    fireEvent.click(triggerBtn);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload page/i }));
  });

  it('show error in console', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    render(<App></App>);
    const triggerBtn = screen.getByRole('button', {
      name: /trigger test error/i,
    });
    fireEvent.click(triggerBtn);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('reloads page in click btn reload page', () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { reload: reloadMock });

    render(<App></App>);
    const triggerBtn = screen.getByRole('button', {
      name: /trigger test error/i,
    });
    fireEvent.click(triggerBtn);

    fireEvent.click(screen.getByRole('button', { name: /reload page/i }));
    expect(reloadMock).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
