import { useCallback, useEffect, useState } from 'react';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Main from '../main/main';
import Header from '../header/header';
import { charactersApi } from '../../services/service';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import About from '../About/About';
import NotFoundPage from '../NotFound/NotFoundComponent';
import CharacterDetails from '../CharacterDetails/СharacterDetails';
import SelectedItemsPanel from '../SelectedItemsPanel/SelectedItemsPanel';

function App() {
  const [lastSearch, setLastSearch] = useState(
    () => localStorage.getItem('lastSearch') || ''
  );
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const { data, isLoading } = charactersApi.useGetCharactersQuery({
    query: lastSearch,
    page: currentPage,
  });
  const characters = data?.data;
  const totalPages = Number(data?.info?.pages);

  useEffect(() => {
    const pageURL = parseInt(searchParams.get('page') || '1');
    setCurrentPage(isNaN(pageURL) ? 1 : pageURL);
    setLastSearch(lastSearch);
  }, [location.search]);

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1);
      localStorage.setItem('lastSearch', query);
      setLastSearch(query);
      navigate(`?search=${encodeURIComponent(query)}&page=1`);
    },
    [navigate]
  );

  return (
    <ErrorBoundary>
      <div className="bg-violet-600 min-h-screen dark:bg-violet-900">
        <Header
          isLoading={isLoading}
          searchQuery={lastSearch}
          onSearch={handleSearch}
          currentPage={currentPage}
        ></Header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  characters={characters || []}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchQuery={lastSearch}
                ></Main>
                <SelectedItemsPanel />
              </>
            }
          >
            <Route path="character/:id" element={<CharacterDetails />}></Route>
          </Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
