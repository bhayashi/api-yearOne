import React from 'react';

const SearchResults = (props: any) => {
  const { data } = props;
  const { Title, Year, Poster } = data;
  return (
    <div>
      <h2>{Title}</h2>
      <p>{Year}</p>
      <img src={Poster} alt={`Poster for ${Title}`} />
    </div>
  );
};

export default SearchResults;
