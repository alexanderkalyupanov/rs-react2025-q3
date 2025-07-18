import React from 'react';
import type { Character } from '../cardItem/CardItem';
import CardItem from '../cardItem/CardItem';

interface ResultsProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class CardList extends React.Component<ResultsProps> {
  render() {
    const { characters, loading, error, shouldThrow } = this.props;
    if (shouldThrow) {
      throw new Error('Test error triggered by button');
    }

    if (loading) {
      return (
        <div
          className="flex justify-center items-center h-screen loading-spinner"
          data-testid="loading-box"
        >
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
            data-testid="loading"
          />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    if (characters.length === 0) {
      return (
        <div className="text-red-500 text-center p-4">No characters found</div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 px-5 py-10 place-items-center">
        {characters.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
