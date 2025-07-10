import React from 'react';
import Search from '../Search/Search';

class Header extends React.Component {
  render() {
    return (
      <header className="flex px-7 py-7 justify-between">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-center align-center">
          Rick & Morty
        </h1>
        <Search></Search>
      </header>
    );
  }
}

export default Header;
