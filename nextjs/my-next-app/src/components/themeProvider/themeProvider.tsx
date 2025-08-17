'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useEffect, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeProviderChild {
  children: ReactNode;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderChild) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
