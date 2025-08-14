import { render, screen, within } from '@testing-library/react';
import About from './About';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('About Component', () => {
  it('renders developer name', () => {
    render(<About />);
    expect(screen.getByText('Alexander Kalyupanov')).toBeInTheDocument();
  });

  it('renders developer role', () => {
    render(<About />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('render github Link', () => {
    render(<About />);
    const aboutContainer = screen.getByTestId('about-container');

    const githubLink = within(aboutContainer).getByRole('link', {
      name: /alexanderkalyupanov/i,
    });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/alexanderkalyupanov'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('displays developer photo with alt text', () => {
    render(<About />);
    const image = screen.getByAltText('developer image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('has correct container styling', () => {
    render(<About />);
    const container = screen.getByTestId('about-container');
    expect(container).toHaveClass('border-purple-500');
    expect(container).toHaveClass('rounded-3xl');
    expect(container).toHaveClass('border-4');
  });

  it('renders Footer component', () => {
    render(<About />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
