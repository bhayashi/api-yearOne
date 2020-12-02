import React, { useState } from 'react';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';

const HomeContainer = () => {
  const [omdbResults, setOmdbResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  async function handleEnter(e: any): Promise<any> {
    if (e.key === 'Enter') {
      setOmdbResults(true);
      setSearchText(e.target.value);
      await fetch(`http://www.omdbapi.com/?apikey=67bbf4fa&s=${searchText}`, {
        method: 'GET',
      })
        .then((response: any) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      setSearchText('');
    }
  }

  return (
    <div id="home-container">
      <h1>Open Movie Database</h1>
      {/* <Search /> */}
      <div>
        <input
          id="search-bar"
          type="text"
          placeholder="Search by title"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleEnter}
          value={searchText}
        />
      </div>
      {omdbResults ? <SearchResults /> : <div />}
    </div>
  );
};

export default HomeContainer;
