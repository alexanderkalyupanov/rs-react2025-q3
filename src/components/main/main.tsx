import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';

interface MainProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
  onTriggerError: () => void;
}

function Main({
  characters,
  isLoading,
  error,
  shouldThrow,
  onTriggerError,
}: MainProps) {
  console.log('Main render', isLoading);
  return (
    <main>
      <CardList
        characters={characters}
        error={error}
        isLoading={isLoading}
        shouldThrow={shouldThrow}
      />
      <div className="mt-4 text-center pb-5">
        <button
          onClick={onTriggerError}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Trigger Test Error
        </button>
      </div>
    </main>
  );
}

export default Main;
