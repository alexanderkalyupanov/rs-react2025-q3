import React from 'react';
import type { Character } from '../cardItem/CardItem';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Main from '../main/main';
import Header from '../header/header';
import { fetchCharacters } from '../../services/service';

interface AppState {
  characters: Array<Character>;
  loading: boolean;
  error: string | null;
  lastSearch: string;
  shouldThrow: boolean;
}
class App extends React.Component {
  state: AppState = {
    characters: [],
    loading: false,
    error: null,
    lastSearch: localStorage.getItem('lastSearch') || '',
    shouldThrow: false,
  };

  componentDidMount(): void {
    this.fetchData(this.state.lastSearch);
  }

  fetchData = async (query: string = ''): Promise<void> => {
    this.setState({ loading: true, error: null });
    const { data, error } = await fetchCharacters(query);

    if (error) {
      this.setState({ error, characters: [] });
    } else if (data) {
      this.setState({ characters: data });
    }

    this.setState({ loading: false });
  };

  handleSearch = (query: string): void => {
    localStorage.setItem('lastSearch', query);
    this.setState({ lastSearch: query });
    this.fetchData(query);
  };

  triggerError = (): void => {
    this.setState({ shouldThrow: true });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="bg-violet-600">
          <Header
            loading={this.state.loading}
            searchQuery={this.state.lastSearch}
            onSearch={this.handleSearch}
          ></Header>
          <Main
            characters={this.state.characters}
            error={this.state.error}
            loading={this.state.loading}
            shouldThrow={this.state.shouldThrow}
            onTriggerError={this.triggerError}
          ></Main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
