import React from 'react';

export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  type: string;
  origin: object;
  location: object;
  episode: Array<string>;
  url: string;
  created: string;
}

interface CardItemProps {
  character: Character;
}

class CardItem extends React.Component<CardItemProps> {
  render() {
    const { character } = this.props;
    return (
      <div className="item">
        <img
          src={character.image}
          alt={character.name}
          className="width-50 height-50"
        />
        <h3>{character.name}</h3>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Status: {character.status}</p>
      </div>
    );
  }
}

export default CardItem;
