import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsContainer = () => {
  const { imdbID } = useParams();
  const dummyData = {
    Title: 'Inception',
    Year: '2010',
    Rated: 'PG-13',
    Released: '16 Jul 2010',
    Runtime: '148 min',
    Genre: 'Action, Adventure, Sci-Fi, Thriller',
    Director: 'Christopher Nolan',
    Writer: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
    Plot:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    Language: 'English, Japanese, French',
    Country: 'USA, UK',
    Awards: 'Won 4 Oscars. Another 152 wins & 218 nominations.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.8/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '87%',
      },
      {
        Source: 'Metacritic',
        Value: '74/100',
      },
    ],
    Metascore: '74',
    imdbRating: '8.8',
    imdbVotes: '2,029,549',
    imdbID: 'tt1375666',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: 'N/A',
    Production: 'Warner Bros., Syncopy',
    Website: 'N/A',
    Response: 'True',
  };
  const [movieDetails, setMovieDetails] = useState(dummyData);
  const { Title, Director, Year, Plot, Poster } = movieDetails;
  return (
    <div id="details-div">
      <h2>{Title}</h2>
      <p>{imdbID}</p>
      <p>{Director}</p>
      <p>{Year}</p>
      <p>{Plot}</p>
      <p>Thumbs Up!</p>
      <img className="movie-poster" src={Poster} alt={`Poster for ${Title}`} />
    </div>
  );
};

export default DetailsContainer;
