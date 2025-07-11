import './style.css';
import React from 'react';
import type { Character } from './components/cardItem/cardItem';
import CardItem from './components/cardItem/cardItem';
import SearchComponent from './components/Search/Search';

interface AppState {
  characters: Array<Character>;
  loading: boolean;
  error: string | null;
  lastSearch: string;
}
class App extends React.Component {
  state: AppState = {
    characters: [],
    loading: false,
    error: null,
    lastSearch: localStorage.getItem('lastSearch') || '',
  };

  componentDidMount(): void {
    this.fetchData(this.state.lastSearch);
  }

  fetchData = async (query: string = ''): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        query
          ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
          : `https://rickandmortyapi.com/api/character`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      this.setState({ characters: data.results || [] });
    } catch {
      this.setState({ error: 'Error', characters: [] });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (query: string) => {
    localStorage.setItem('lastSearch', query);
    this.setState({ lastSearch: query });
    this.fetchData(query);
  };

  renderContent() {
    const { characters, loading, error } = this.state;

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    if (characters.length === 0) {
      return (
        <div className="text-red-500 text-center p-4">No characters found</div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 px-5 py-10 place-items-center">
        {characters.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="bg-violet-600">
        <header className="flex px-7 py-7 justify-between">
          <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-light text-center align-center">
            Rick & Morty
          </h1>
          <SearchComponent
            onSearch={this.handleSearch}
            searchQuery={this.state.lastSearch}
            loading={this.state.loading}
          ></SearchComponent>
        </header>

        <main>{this.renderContent()}</main>
      </div>
    );
  }
}

export default App;
