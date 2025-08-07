import type { Character } from '../components/cardItem/CardItem';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const charactersApi = createApi({
  reducerPath: 'rickmortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (build) => ({
    getCharacters: build.query<
      {
        data: Character[] | null;
        error: string | null;
        info?: ApiResponse['info'];
      },
      { query?: string; page?: number }
    >({
      query: ({ query = '', page = 1 }) => {
        const params = new URLSearchParams();
        if (query) {
          params.append('name', query);
        }
        params.append('page', page.toString());
        return {
          url: '',
          params,
        };
      },
      transformResponse: (response: ApiResponse) => ({
        data: response.results || null,
        error: null,
        info: response.info,
      }),
      transformErrorResponse: (response: {
        status: number;
        data?: { error: string };
      }) => {
        const status = response.status;
        let errorMessage = `${status}: `;

        switch (status) {
          case 404:
            errorMessage += 'Characters not found!';
            break;
          case 500:
            errorMessage += 'Server error, please try later!';
            break;
          case 400:
            errorMessage += 'Invalid request!';
            break;
          default:
            errorMessage += 'Unknown error';
            break;
        }

        return {
          status,
          error: errorMessage,
        };
      },
    }),
    getCharacterById: build.query<Character, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformErrorResponse: (response: {
        status: number;
        data?: { error: string };
      }) => {
        const status = response.status;
        let errorMessage = `${status}: `;

        switch (status) {
          case 404:
            errorMessage += 'Characters not found!';
            break;
          case 500:
            errorMessage += 'Server error, please try later!';
            break;
          case 400:
            errorMessage += 'Invalid request!';
            break;
          default:
            errorMessage += 'Unknown error';
            break;
        }

        return {
          status,
          error: errorMessage,
        };
      },
    }),
  }),
});
