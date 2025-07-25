import Pagination from '../Pagination/Pagination';
import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';

interface MainProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

function Main({
  characters,
  isLoading,
  error,
  shouldThrow,
  currentPage,
  totalPages,
  searchQuery,
}: MainProps) {
  return (
    <>
      <main className="pb-10 pl-5 pr-5 ">
        <CardList
          characters={characters}
          error={error}
          isLoading={isLoading}
          shouldThrow={shouldThrow}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        ></Pagination>
      </main>
    </>
  );
}

export default Main;
