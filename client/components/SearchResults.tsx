import React from 'react';

const SearchResults = (props: any) => {
  const { data } = props;
  const { Title, Year, Poster } = data;
  return (
    <div className="search-results">
      <h2>{Title}</h2>
      <p>{Year}</p>
      <img className="movie-poster" src={Poster} alt={`Poster for ${Title}`} />
    </div>
  );
};

export default SearchResults;
