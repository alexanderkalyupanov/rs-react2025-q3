import type { Character } from '../components/cardItem/CardItem';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

interface ApiResponse {
  results: Character[];
  error?: string;
}

export const fetchCharacters = async (
  query: string = ''
): Promise<{ data: Character[] | null; error: string | null }> => {
  try {
    const url = query
      ? `${API_BASE_URL}/?name=${encodeURIComponent(query)}`
      : API_BASE_URL;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage = `Error ${response.status}: `;

      switch (response.status) {
        case 404:
          errorMessage += 'Characters not found';
          break;
        case 400:
          errorMessage += 'Invalid request';
          break;
        case 500:
          errorMessage += 'Server error';
          break;
        default:
          errorMessage += errorData?.error || 'Failed to fetch characters';
      }
      throw new Error(errorMessage);
    }
    const data: ApiResponse = await response.json();
    return { data: data.results || [], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error...',
    };
  }
};
