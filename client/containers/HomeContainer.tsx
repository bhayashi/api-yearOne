import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from '../components/SearchResults';

const HomeContainer = () => {
  const [omdbStatus, setOmdbStatus] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [omdbResults, setOmdbResults] = useState([]);

  async function handleEnter(e: any): Promise<any> {
    if (e.key === 'Enter') {
      setOmdbStatus(true);
      setSearchText(e.target.value);
      await fetch(`https://www.omdbapi.com/?apikey=67bbf4fa&s=${searchText}`, {
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
      <img
        src="https://fontmeme.com/permalink/201202/e8897ef54599f593d10071f7833c4582.png"
        alt="netflix-font"
      />
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
            <Link
              to={`/details/${movie.imdbID}`}
              className="omdb-results-link"
              key={`link${movie.imdbID}`}
            >
              <SearchResults key={movie.imdbID} data={movie} />
            </Link>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
