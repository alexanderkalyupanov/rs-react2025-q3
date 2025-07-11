import React from 'react';
import type { Character } from '../cardItem/cardItem';
import CardItem from '../cardItem/cardItem';

interface ResultsProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class CardList extends React.Component<object, ResultsProps> {
  state: ResultsProps = {
    characters: [],
    loading: true,
    error: null,
  };
  render() {
    const { characters, loading, error } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    if (loading) {
      return <div>{loading}</div>;
    }
    return (
      <div className="card-list">
        {characters.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
