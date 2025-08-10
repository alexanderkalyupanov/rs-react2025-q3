import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { charactersApi } from './service';
import { createMockStore, mockCharacters } from '../tests/mockData';

describe('Service api test', () => {
  let store: ReturnType<typeof createMockStore>;
  let origFetch: typeof global.fetch;

  beforeEach(() => {
    store = createMockStore({
      selectedItems: { selectedCharacters: [] },
      characters: { selectedCharactersData: [] },
    });
    origFetch = global.fetch;
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = origFetch;
    vi.restoreAllMocks();
  });

  const getCalledUrl = (): string => {
    const calls = vi.mocked(global.fetch).mock.calls;
    if (!calls) {
      throw new Error('No fetch calls were made');
    }
    const [input] = calls[0];

    if (typeof input === 'string') {
      return input;
    }
    if (input instanceof URL) {
      return input.toString();
    }
    if (input instanceof Request) {
      return input.url;
    }
    throw new Error('Unknown input type for fetch');
  };

  it('should fetch characters correctly without query', async () => {
    const mockResponse = new Response(
      JSON.stringify({
        results: mockCharacters,
        info: { count: 2, pages: 1, prev: null, next: null },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({})
    );

    const calledUrl = getCalledUrl();
    expect(calledUrl).toContain(
      'https://rickandmortyapi.com/api/character?page=1'
    );

    expect(result.data).toEqual({
      data: mockCharacters,
      error: null,
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
    });
    expect(result.error).toBeUndefined();
  });

  it('should fetch characters correctly with query=Rick', async () => {
    const mockResponse = new Response(
      JSON.stringify({
        results: [mockCharacters[0]],
        info: { count: 1, pages: 1, prev: null, next: null },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({ query: 'Rick', page: 1 })
    );

    const calledUrl = getCalledUrl();
    expect(calledUrl).toContain(
      'https://rickandmortyapi.com/api/character?name=Rick&page=1'
    );

    expect(result.data).toEqual({
      data: [mockCharacters[0]],
      error: null,
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
    });
    expect(result.error).toBeUndefined();
  });

  it('should handle error 404', async () => {
    const mockResponse = new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({
        query: 'afafafafafafafafa',
      })
    );

    expect(result.error).toEqual({
      status: 404,
      error: '404: Characters not found!',
    });
    expect(result.data).toBeUndefined();
  });

  it('should handle error 500', async () => {
    const mockResponse = new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({})
    );

    expect(result.error).toEqual({
      status: 500,
      error: '500: Server error, please try later!',
    });
    expect(result.data).toBeUndefined();
  });

  it('should handle empty response data', async () => {
    const mockResponse = new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate({})
    );

    expect(result.data).toEqual({
      data: [],
      error: null,
    });
    expect(result.error).toBeUndefined();
  });
});
