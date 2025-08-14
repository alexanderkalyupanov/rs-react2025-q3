import { charactersApi } from '../../services/service';
import { isApiError } from '../../utils';
import Spinner from '../Spinner/Spinner';
import type { Character } from '../cardItem/CardItem';
import CardItem from '../cardItem/CardItem';

interface ResultsProps {
  characters: Character[];
  currentPage: number;
  isLoading: boolean;
  totalPages: number;
  searchQuery: string;
}

function CardList({
  characters,
  currentPage,
  searchQuery,
  isLoading,
}: ResultsProps) {
  const { error } = charactersApi.useGetCharactersQuery({
    query: searchQuery,
    page: currentPage,
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    const errorMessage = isApiError(error) ? error.error : 'Unknown error';
    return <div className="text-center text-red-500 p-4">{errorMessage}</div>;
  }

  if (characters.length === 0) {
    return (
      <div className="text-red-500 text-center p-4">No characters found</div>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 px-5 py-10 place-items-center"
        data-testid="character-list"
      >
        {characters.map((character) => (
          <CardItem
            key={character.id}
            character={character}
            data-testid={`character-${character.id}`}
          />
        ))}
      </div>
    </>
  );
}

export default CardList;
