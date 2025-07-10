import React from 'react';

interface SearchState {
  searchQuery: string;
}

class Search extends React.Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <div className="flex items-center">
        <form className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            placeholder="Search..."
            className="border-5px-solid bg-white-300 border-2 border-solid border-purple-400 p-2 color-neutral-100 mr-4       w-full
              sm:w-60
              md:w-80 text-gray-100  focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-300 p-2 rounded w-25 cursor-pointer whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
