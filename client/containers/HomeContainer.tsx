import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from '../components/SearchResults';
import { MovieSearchResult } from '../utils/interfaces';

// container for search-bar and SearchResults components aka movie-title-cards
const HomeContainer = () => {
  const [omdbStatus, setOmdbStatus] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [omdbResults, setOmdbResults] = useState([]);

  // function to handle pressing enter on the search bar
  function handleEnter(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      setOmdbStatus(true);
      if (e.target !== null) {
        setSearchText((e.target as HTMLInputElement).value);
      }
      fetch(`https://www.omdbapi.com/?apikey=67bbf4fa&s=${searchText}`, {
        method: 'GET',
      })
        .then((response: Response) => response.json())
        .then((response) => {
          setOmdbResults(response.Search);
        })
        .catch((err: Error) => console.error(err));
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
          omdbResults.map((movie: MovieSearchResult) => (
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
