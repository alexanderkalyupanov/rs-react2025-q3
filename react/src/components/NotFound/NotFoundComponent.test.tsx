import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import NotFoundPage from './NotFoundComponent';
import { MemoryRouter } from 'react-router';

describe('NotFoundPage Component', () => {
  it('show 404', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('404')).toHaveClass('text-5xl');
  });

  it('show text "Page Not Found"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toHaveClass('text-3xl');
  });

  it('show message error', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const message = screen.getByText(/Oops! The page you are looking for/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-xl');
  });

  it('render button go to main', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const button = screen.getByRole('link', { name: /Go to Main/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-violet-600');
  });
});
