import SearchComponent from '../Search/Search';
import { NavLink } from 'react-router';
interface HeaderProps {
  isLoading: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
}

function Header({ searchQuery, onSearch, isLoading }: HeaderProps) {
  return (
    <header className="flex px-7 py-7 justify-between md:flex-row gap-4">
      <NavLink to="/">
        <h1 className="flex items-center justify-center text-2xl sm:text-xl md:text-4xl lg:text-5xl font-light text-center align-center">
          Rick & Morty
        </h1>
      </NavLink>
      <NavLink
        to="/about"
        className="flex items-center justify-center md:text-lg lg:text-xl xl:text-2xl hover:text-pink-200 transition"
      >
        About
      </NavLink>
      <SearchComponent
        onSearch={onSearch}
        searchQuery={searchQuery}
        isLoading={isLoading}
      ></SearchComponent>
    </header>
  );
}

export default Header;
