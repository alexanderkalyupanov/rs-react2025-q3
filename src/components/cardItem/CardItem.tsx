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
      <div
        className="item flex flex-col justify-center items-start w-90 border-3 border-solid border-purple-500 rounded-3xl pb-4 mb-5 bg-purple-500"
        data-testid="character-card"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-90 rounded-3xl"
        />
        <div className="pl-3 pt-2">
          <h3 className="text-pink-300">{character.name}</h3>
          <p className="text-rose-100">
            <span className="text-pink-200">Species: </span>
            {character.species}
          </p>
          <p className="text-rose-100">
            <span className="text-pink-200">Gender:</span> {character.gender}
          </p>
          <p className="text-rose-100">
            <span className="text-pink-200">Status:</span> {character.status}
          </p>
        </div>
      </div>
    );
  }
}

export default CardItem;
