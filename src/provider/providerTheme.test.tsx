import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeProvider } from './providerTheme';

vi.mock('../hooks/useLocalStorage');

describe('ThemeProvider', () => {
  const mockSetLocalStorage = vi.fn();

  beforeEach(() => {
    vi.mocked(useLocalStorage).mockReturnValue(['light', mockSetLocalStorage]);
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.className = '';
  });

  it('should update body class when theme changes', () => {
    vi.mocked(useLocalStorage).mockReturnValueOnce([
      'light',
      mockSetLocalStorage,
    ]);
    const { rerender } = render(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );
    expect(document.body.classList.contains('dark')).toBe(false);

    vi.mocked(useLocalStorage).mockReturnValueOnce([
      'dark',
      mockSetLocalStorage,
    ]);
    rerender(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('should remove dark class when switching to light theme', () => {
    vi.mocked(useLocalStorage).mockReturnValueOnce([
      'dark',
      mockSetLocalStorage,
    ]);
    const { rerender } = render(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );
    expect(document.body.classList.contains('dark')).toBe(true);

    vi.mocked(useLocalStorage).mockReturnValueOnce([
      'light',
      mockSetLocalStorage,
    ]);
    rerender(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
