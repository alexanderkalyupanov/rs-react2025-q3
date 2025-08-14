'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { charactersApi } from '@/services/service';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';
import Header from '@/components/header/header';
import Main from '@/components/main/main';

function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [lastSearch, setLastSearch] = useState(
  //   () => localStorage.getItem('lastSearch') || ''
  // );
  const [lastSearch, setLastSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


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
  }, [searchParams]);

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1);
      localStorage.setItem('lastSearch', query);
      setLastSearch(query);
      router.push(`?search=${encodeURIComponent(query)}&page=1`);
    },
    [router]
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
        <Main
          characters={characters || []}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={lastSearch}
        ></Main>
        {/* <SelectedItemsPanel /> */}
      </div>
    </ErrorBoundary>
  );
}

export default App;
