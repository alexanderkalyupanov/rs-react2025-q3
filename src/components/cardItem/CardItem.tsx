import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import type { RootState } from '../../store/store';
import type { ChangeEvent } from 'react';
import { toggleCharacterSelected } from '../../store/selectedItemsSlice';

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
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );
  const isSelected = selectedCharacters.includes(character.id);
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('details', character.id.toString());

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();
    dispatch(toggleCharacterSelected(character.id));
  }

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
          <div className="flex">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className="top-2 right-2 h-5 w-5 rounded text-pink-600 focus:ring-pink-500"
            />
            {isSelected ? (
              <span className="text-pink-200 ml-1">Selected</span>
            ) : (
              <span className="text-pink-200 ml-1">Unselected</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
