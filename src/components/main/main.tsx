import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';

interface MainProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

function Main({ characters, isLoading, error, shouldThrow }: MainProps) {
  console.log('Main render', isLoading);
  return (
    <main className="pb-10 pl-5 pr-5 ">
      <CardList
        characters={characters}
        error={error}
        isLoading={isLoading}
        shouldThrow={shouldThrow}
      />
    </main>
  );
}

export default Main;
