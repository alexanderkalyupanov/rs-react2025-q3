'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const locData = window.localStorage.getItem(key);
      return locData ? JSON.parse(locData) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
