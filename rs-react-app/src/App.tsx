import './style.css';
import React from 'react';
import type { Character } from './components/cardItem/CardItem';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Main from './components/main/main';
import Header from './components/header/header';

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

    try {
      const response = await fetch(
        query
          ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
          : `https://rickandmortyapi.com/api/character`
      );
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

      const data = await response.json();
      this.setState({ characters: data.results || [] });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error...',
        characters: [],
      });
    } finally {
      this.setState({ loading: false });
    }
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
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-6 text-center">Please try again later</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-red-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        }
      >
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
