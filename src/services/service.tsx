import type { Character } from '../components/cardItem/CardItem';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

interface ApiResponse {
  results: Character[];
  error?: string;
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export const fetchCharacters = async (
  query: string = '',
  page: number = 1
): Promise<{
  data: Character[] | null;
  error: string | null;
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}> => {
  try {
    const url = query
      ? `${API_BASE_URL}/?name=${encodeURIComponent(query)}&page=${page}`
      : `${API_BASE_URL}/?page=${page}`;
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
    return {
      data: data.results || [],
      error: null,
      info: data.info,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error...',
    };
  }
};
