import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';

const HomeContainer = () => {
  const [omdbStatus, setOmdbStatus] = useState(true);
  const [searchText, setSearchText] = useState('');
  const dummyData = {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
    Title: 'Johnny Test',
    Year: '2005-2014',
    imdbID: 'tt0454349',
  };
  const dummyData2 = {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
    Title: 'Johnny Test: The Last Man From Another Planet Blah BLah',
    Year: '2005-2014',
    imdbID: 'tt0454348',
  };
  const [omdbResults, setOmdbResults] = useState([dummyData, dummyData2]);

  async function handleEnter(e: any): Promise<any> {
    if (e.key === 'Enter') {
      setOmdbStatus(true);
      setSearchText(e.target.value);
      await fetch(`http://www.omdbapi.com/?apikey=67bbf4fa&s=${searchText}`, {
        method: 'GET',
      })
        .then((response: any) => response.json())
        .then((response) => {
          console.log(response.Search);
          setOmdbResults(response.Search);
        })
        .catch((err) => console.error(err));
      setSearchText('');
    }
  }

  return (
    <div id="home-container">
      <h1 id="home-title">Open Movie Database</h1>
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
      <div id="search-results-container">
        {omdbStatus ? (
          omdbResults.map((movie: any) => (
            <SearchResults key={movie.imdbID} data={movie} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
