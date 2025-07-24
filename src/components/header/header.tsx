import SearchComponent from '../Search/Search';

interface HeaderProps {
  loading: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
}

function Header({ searchQuery, onSearch, loading }: HeaderProps) {
  return (
    <header className="flex px-7 py-7 justify-between">
      <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-light text-center align-center">
        Rick & Morty
      </h1>
      <SearchComponent
        onSearch={onSearch}
        searchQuery={searchQuery}
        loading={loading}
      ></SearchComponent>
    </header>
  );
}
// class Header extends React.Component<HeaderProps> {
//   render() {
//     const { loading, searchQuery, onSearch } = this.props;
//     return (
//       <header className="flex px-7 py-7 justify-between">
//         <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-light text-center align-center">
//           Rick & Morty
//         </h1>
//         <SearchComponent
//           onSearch={onSearch}
//           searchQuery={searchQuery}
//           loading={loading}
//         ></SearchComponent>
//       </header>
//     );
//   }
// }

export default Header;
