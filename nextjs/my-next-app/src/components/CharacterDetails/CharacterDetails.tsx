import Spinner from '@/components/Spinner/Spinner';
import { charactersApi } from '@/services/service';
import { isApiError } from '@/utils/utils';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function CharacterDetails({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: character,
    isFetching,
    error,
  } = charactersApi.useGetCharacterByIdQuery(Number(id));

  if (isFetching) {
    return <Spinner></Spinner>;
  }

  if (error) {
    const errorMessage = isApiError(error) ? error.error : 'Unknown error';
    return <div className="text-center text-red-500 p-4">{errorMessage}</div>;
  }

  if (!character) {
    return (
      <div className="text-red-500 text-center p-4">No characters found</div>
    );
  }

  const handleClose = () => {
    const page = searchParams.get('page') || '1';
    router.push({
      pathname: '/',
      search: `?page=${page}`,
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto p-6 md:p-8 max-w-4xl">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer md:right-4 dark:text-zinc-50 dark:hover:bg-violet-100"
        aria-label="Close details"
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
      <div className="flex flex-col w-100 gap-4 md:gap-8">
        <Image
          src={character.image}
          alt={character.name}
          width={360}
          height={360}
          className="w-full  rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 dark:text-zinc-50">
            {character.name}
          </h2>
          <p className="mb-2 dark:text-zinc-50">
            <strong>Status:</strong> {character.status}
          </p>
          <p className="mb-2 dark:text-zinc-50">
            <strong>Species:</strong> {character.species}
          </p>
          <p className="mb-2 dark:text-zinc-50">
            <strong>Gender:</strong> {character.gender}
          </p>
          <p className="mb-2 dark:text-zinc-50">
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p className="mb-2 dark:text-zinc-50">
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
