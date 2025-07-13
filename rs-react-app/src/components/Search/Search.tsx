import React from 'react';

interface SearchState {
  searchQuery: string;
  loading: boolean;
  onSearch: (query: string) => void;
}

class SearchComponent extends React.Component<SearchState> {
  state = {
    searchQuery: this.props.searchQuery || '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const queryTrimmed = this.state.searchQuery.trim();
    this.props.onSearch(queryTrimmed);
  };

  render() {
    return (
      <div className="flex items-center">
        <form
          className="flex flex-col flex-row gap-2 w-full sm:pl-5"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
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
}

export default SearchComponent;
