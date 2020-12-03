import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsContainer = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dummyData = {
    Title: 'Inception',
    Director: 'null',
    Year: 'null',
    Plot: 'null',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  };
  const [movieDetails, setMovieDetails] = useState(dummyData);

  async function getMovieDetails(id: string): Promise<any> {
    await fetch(`http://www.omdbapi.com/?apikey=67bbf4fa&i=${id}`, {
      method: 'GET',
    })
      .then((response: any) => response.json())
      .then((response) => {
        console.log(response);
        setMovieDetails(response);
      })
      .catch((err) => console.error(err));
  }

  const { Title, Director, Year, Plot, Poster } = movieDetails;

  if (Title === 'null') {
    getMovieDetails(imdbID);
  }

  return (
    <div id="details-card">
      <h2>{Title}</h2>
      <p>{Director}</p>
      <p>{Year}</p>
      <p>{Plot}</p>
      <p>Thumbs Up!</p>
      <img className="movie-poster" src={Poster} alt={`Poster for ${Title}`} />
    </div>
  );
};

export default DetailsContainer;
