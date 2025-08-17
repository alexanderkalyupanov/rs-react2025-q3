'use client';

import Pagination from '../Pagination/Pagination';
import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';
import { charactersApi } from '../../services/service';
import { useSearchParams } from 'next/navigation';

interface MainProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

function Main({ characters, currentPage, totalPages, searchQuery }: MainProps) {
  const searchParams = useSearchParams();
  const characterId = searchParams.get('character');
  const { isFetching } = charactersApi.useGetCharactersQuery({
    query: searchQuery,
    page: currentPage,
  });
  return (
    <div className="flex min-h-screen">
      <div
        className={`${characterId ? 'w-2/3' : 'w-full'} p-5 overflow-y-auto`}
      >
        <CardList
          characters={characters}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          isLoading={isFetching}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

export default Main;
