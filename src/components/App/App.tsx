import { useCallback, useEffect, useState } from 'react';
import type { Character } from '../cardItem/CardItem';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Main from '../main/main';
import Header from '../header/header';
import { fetchCharacters } from '../../services/service';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from '../About/About';
import NotFoundPage from '../NotFound/NotFoundComponent';

// interface AppState {
//   characters: Array<Character>;
//   loading: boolean;
//   error: string | null;
//   lastSearch: string;
//   shouldThrow: boolean;
// }

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [lastSearch, setLastSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );
  // const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    fetchData(lastSearch);
  }, [lastSearch]);

  const fetchData = useCallback(
    async (query: string = '') => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchCharacters(query);

      if (error) {
        setError(error);
        setCharacters([]);
      } else {
        setCharacters(data || []);
      }
      setLoading(false);
    },
    [lastSearch]
  );

  const handleSearch = useCallback((query: string) => {
    localStorage.setItem('lastSearch', query);
    setLastSearch(query);
  }, []);

  // function triggerError(): void {
  //   setShouldThrow(true);
  // }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="bg-violet-600">
          <Header
            isLoading={loading}
            searchQuery={lastSearch}
            onSearch={handleSearch}
          ></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  characters={characters}
                  error={error}
                  isLoading={loading}
                  shouldThrow={shouldThrow}
                ></Main>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
