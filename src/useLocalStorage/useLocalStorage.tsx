import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [state, setState] = useState(() => {
    const locData = localStorage.getItem(key);
    return locData || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
