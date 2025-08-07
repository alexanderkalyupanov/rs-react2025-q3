import { useContext } from 'react';
import SearchComponent from '../Search/Search';
import { NavLink } from 'react-router';
import { ThemeContext } from '../../provider/providerTheme';
import { charactersApi } from '../../services/service';
interface HeaderProps {
  isLoading: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
  currentPage: number;
}

function Header({
  searchQuery,
  onSearch,
  isLoading,
  currentPage,
}: HeaderProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { refetch } = charactersApi.useGetCharactersQuery({
    query: searchQuery,
    page: currentPage,
  });

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <header className="flex items-center justify-between px-7 py-7 md:flex-row gap-4">
      <NavLink to="/">
        <h1 className="flex items-center justify-center text-2xl sm:text-xl md:text-4xl lg:text-5xl font-light text-center align-center dark:text-stone-50">
          Rick & Morty
        </h1>
      </NavLink>
      <div className="flex items-center gap-4">
        <button
          onClick={() => refetch()}
          className="bg-purple-300 p-2 rounded w-17 cursor-pointer hover:bg-purple-500"
        >
          Refetch
        </button>
        <NavLink
          to="/about"
          className="flex items-center justify-center md:text-lg lg:text-xl xl:text-2xl hover:text-pink-200 transition dark:text-stone-50 dark:hover:text-pink-100"
        >
          About
        </NavLink>
        <button
          className="flex items-center justify-center md:text-lg lg:text-xl xl:text-2xl hover:text-pink-200 transition dark:text-stone-50 dark:hover:text-pink-100 cursor-pointer"
          onClick={changeTheme}
        >
          {theme === 'dark' ? <>Dark</> : <>Light</>}
        </button>
        <SearchComponent
          onSearch={onSearch}
          searchQuery={searchQuery}
          isLoading={isLoading}
        ></SearchComponent>
      </div>
    </header>
  );
}

export default Header;
