import { useCallback, useEffect, useState } from 'react';
import type { Character } from '../cardItem/CardItem';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Main from '../main/main';
import Header from '../header/header';
import { fetchCharacters } from '../../services/service';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import About from '../About/About';
import NotFoundPage from '../NotFound/NotFoundComponent';
import CharacterDetails from '../CharacterDetails/СharacterDetails';
import SelectedItemsPanel from '../SelectedItemsPanel/SelectedItemsPanel';

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
  const [shouldThrow, setShouldThrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const pageURL = parseInt(searchParams.get('page') || '1');
    setCurrentPage(isNaN(pageURL) ? 1 : pageURL);
    setLastSearch(lastSearch);
    fetchData(lastSearch, pageURL);
  }, [location.search]);

  const fetchData = useCallback(
    async (query: string = '', page: number = 1) => {
      setLoading(true);
      setError(null);
      const { data, error, info } = await fetchCharacters(query, page);

      if (error) {
        setError(error);
        setCharacters([]);
        setTotalPage(0);
      } else {
        setCharacters(data || []);
        setTotalPage(info?.pages || 0);
      }
      setLoading(false);
    },
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1);
      localStorage.setItem('lastSearch', query);
      setLastSearch(query);
      navigate(`?search=${encodeURIComponent(query)}&page=1`);
      fetchData(query, 1);
    },
    [fetchData, navigate]
  );

  function triggerError(): void {
    setShouldThrow(true);
  }

  return (
    <ErrorBoundary>
      <div className="bg-violet-600 min-h-screen">
        <Header
          isLoading={loading}
          searchQuery={lastSearch}
          onSearch={handleSearch}
        ></Header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  characters={characters}
                  error={error}
                  isLoading={loading}
                  shouldThrow={shouldThrow}
                  currentPage={currentPage}
                  totalPages={totalPage}
                  searchQuery={lastSearch}
                ></Main>
                <SelectedItemsPanel></SelectedItemsPanel>
              </>
            }
          >
            <Route
              path="character/:id"
              element={<CharacterDetails></CharacterDetails>}
            ></Route>
          </Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </div>
      <button onClick={triggerError}></button>
    </ErrorBoundary>
  );
}

export default App;
