import { Link } from 'react-router';

export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  type: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: Array<string>;
  url: string;
  created: string;
}

interface CardItemProps {
  character: Character;
}

function CardItem({ character }: CardItemProps) {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('details', character.id.toString());
  return (
    <Link
      to={{
        pathname: `/character/${character.id}`,
        search: searchParams.toString(),
      }}
      className="block p-4 hover:bg-gray-100"
    >
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
    </Link>
  );
}

export default CardItem;
