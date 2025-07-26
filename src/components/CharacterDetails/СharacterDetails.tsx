import { useNavigate, useParams } from 'react-router';
import type { Character } from '../cardItem/CardItem';
import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../../services/service';
import Spinner from '../Spinner/Spinner';

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchCharacterById(Number(id));
          setCharacter(data);
        }
      } catch {
        setError('Failed to fetch character');
      } finally {
        setLoading(false);
      }
    };
    loadCharacter();
  }, [id]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!character) {
    return (
      <div className="text-red-500 text-center p-4">No characters found</div>
    );
  }

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page') || '1';
    navigate({
      pathname: '/',
      search: `?page=${page}`,
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto p-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col w-100 gap-8">
        <img
          src={character.image}
          alt={character.name}
          className="w-full  rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">{character.name}</h2>
          <p className="mb-2">
            <strong>Status:</strong> {character.status}
          </p>
          <p className="mb-2">
            <strong>Species:</strong> {character.species}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {character.gender}
          </p>
          <p className="mb-2">
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
