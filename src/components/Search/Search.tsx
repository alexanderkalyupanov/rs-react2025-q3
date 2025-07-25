import React, { useState } from 'react';
import { useLocalStorage } from '../../useLocalStorage/useLocalStorage';

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

function SearchComponent({ searchQuery = '', onSearch }: SearchProps) {
  const [query, setQuery] = useState(searchQuery);
  const [, setData] = useLocalStorage('searchQuery', '');
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const queryTrimmed = query.trim();
    setData(queryTrimmed);
    onSearch(queryTrimmed);
  }

  return (
    <div className="flex items-center">
      <form
        className="flex flex-col flex-row gap-2 w-full sm:pl-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="border-5px-solid bg-white-300 border-2 border-solid border-purple-400 p-2 color-neutral-100 mr-4       w-full
              sm:w-45
              md:w-60 lg:w-80 text-gray-100  focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple-300 p-2 rounded w-25 cursor-pointer hover:bg-purple-500 transition-colors whitespace-nowrap sm:w-40 "
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;
