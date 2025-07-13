import React from 'react';
import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';

interface MainProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  shouldThrow: boolean;
  onTriggerError: () => void;
}

class Main extends React.Component<MainProps> {
  render() {
    const { characters, loading, error, shouldThrow, onTriggerError } =
      this.props;

    return (
      <main>
        <CardList
          characters={characters}
          error={error}
          loading={loading}
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
}

export default Main;
