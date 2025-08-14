import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { type ChangeEvent } from 'react';
import { toggleCharacterSelected } from '../../store/selectedItemsSlice';
import {
  addSelectedCharacterData,
  removeSelectedCharacterData,
} from '../../store/charactersSlice';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';

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
    url: string;
  };
  location: {
    name: string;
    url: string;
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
  const translate = useTranslations('CardItem');
  const selectedIds = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );
  const isSelected = selectedIds.includes(character.id);
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set('details', character.id.toString());

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();
    dispatch(toggleCharacterSelected(character.id));
    if (!isSelected) {
      dispatch(addSelectedCharacterData(character));
    } else {
      dispatch(removeSelectedCharacterData(character.id));
    }
  }

  return (
    <Link
      href={{
        href: `/character/${character.id}`,
        search: newSearchParams.toString(),
      }}
      className="block p-4 hover:bg-gray-100"
    >
      <div
        className="item flex flex-col justify-center items-start w-90 border-3 border-solid border-purple-500 rounded-3xl pb-4 mb-5 bg-purple-500 dark:bg-purple-800"
        data-testid="character-card"
      >
        <Image
          src={character.image}
          alt={character.name}
          className="w-90 rounded-3xl"
          width={300}
          height={300}
          priority
        />
        <div className="pl-3 pt-2">
          <h3 className="text-pink-300 dark:text-zinc-50">{character.name}</h3>
          <p className="text-rose-100 ">
            <span className="text-pink-200 dark:text-zinc-50">{translate('species')} </span>
            {character.species}
          </p>
          <p className="text-rose-100">
            <span className="text-pink-200 dark:text-zinc-50 ">{translate('gender')}</span>{' '}
            {character.gender}
          </p>
          <p className="text-rose-100">
            <span className="text-pink-200 dark:text-zinc-50">{translate('status')}</span>{' '}
            {character.status}
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
