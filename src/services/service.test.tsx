import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCharacters } from './service';
import { mockCharacters } from '../tests/mockData';

describe('Service api test', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should work fetch correctly without query', async () => {
    const mockResponse = new Response(
      JSON.stringify({ results: mockCharacters }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters();
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
    expect(result.data).toEqual(mockCharacters);
    expect(result.error).toBeNull();
  });

  it('should work fetch correctly with query=Rick', async () => {
    const mockResponse = new Response(
      JSON.stringify({ results: [mockCharacters[0]] }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters('Rick');
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=1'
    );
    expect(result.data).toEqual([mockCharacters[0]]);
    expect(result.error).toBeNull();
  });

  it('should work fetch correctly with query=Morty', async () => {
    const mockResponse = new Response(
      JSON.stringify({ results: [mockCharacters[1]] }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters('Morty');
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Morty&page=1'
    );
    expect(result.data).toEqual([mockCharacters[1]]);
    expect(result.error).toBeNull();
  });

  it('should handle error 404', async () => {
    const mockResponse = new Response(JSON.stringify({ results: {} }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters('afafafafafafafafa');
    expect(result.data).toBeNull();
    expect(result.error).toBe('Error 404: Characters not found');
  });

  it('should handle error 500', async () => {
    const mockResponse = new Response(JSON.stringify({ results: {} }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters();
    expect(result.data).toBeNull();
    expect(result.error).toBe('Error 500: Server error');
  });

  it('should handle error 400', async () => {
    const mockResponse = new Response(JSON.stringify({ results: {} }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters('q gfgf hfh fmnf qweq w ');
    expect(result.data).toBeNull();
    expect(result.error).toBe('Error 400: Invalid request');
  });

  it('should handle error(default case)', async () => {
    const mockResponse = new Response(JSON.stringify({ results: {} }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    const result = await fetchCharacters();
    expect(result.data).toBeNull();
    expect(result.error).toBe(`Error 403: Failed to fetch characters`);
  });

  it('should handle invalid response data', async () => {
    const mockResponse = new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const result = await fetchCharacters();

    expect(result.data).toEqual([]);
    expect(result.error).toBeNull();
  });
});
