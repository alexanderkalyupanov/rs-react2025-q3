import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router';

describe('Footer component', () => {
  it('renders correctly elements', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const rsLink = screen.getByRole('link', { name: /rs-logo/i });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    const rsLogo = screen.getByAltText('rs-logo');
    expect(rsLogo).toBeInTheDocument();

    const year = screen.getByText('2025');
    expect(year).toBeInTheDocument();

    const gitLink = screen.getByRole('link', { name: /alexanderkalyupanov/i });
    expect(gitLink).toHaveAttribute(
      'href',
      'https://github.com/alexanderkalyupanov'
    );
    expect(gitLink).toHaveAttribute('target', '_blank');
    expect(gitLink).toHaveAttribute('rel', 'noreferrer');
    expect(gitLink).toHaveClass('flex gap-2 items-center');
    const gitLogo = screen.getByAltText('git-logo');
    expect(gitLogo).toBeInTheDocument();
    expect(gitLogo).toHaveClass('w-8 h-8');
  });

  it('has correct layout classes', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('justify-between');
    expect(footer).toHaveClass('items-center');
  });
});
