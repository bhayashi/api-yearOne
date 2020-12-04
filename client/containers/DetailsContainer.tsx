/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsContainer = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dummyData = {
    Title: 'Inception',
    Director: 'Christopher Nolan',
    Year: '2010',
    Plot:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  };
  const [movieDetails, setMovieDetails] = useState(dummyData);

  async function getMovieDetails(id: string): Promise<any> {
    await fetch(`http://www.omdbapi.com/?apikey=67bbf4fa&i=${id}`, {
      method: 'GET',
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        setMovieDetails(response);
      })
      .catch((err: Error) => console.error(err));
  }

  async function likeMovie(id: string): Promise<any> {
    console.log('inside likeMovie', JSON.stringify({ imdbID: id }));

    await fetch('/movieLikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imdbID: id }),
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log('PSQL Movie:', response);
      })
      .catch((err: Error) => console.log(err));
  }

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  likeMovie(imdbID);
  const onLike = () => {
    setLikes(likes + 1);
    likeMovie(imdbID);
    setBtnDisabled(true);
  };

  const onDislike = () => {
    setDislikes(dislikes + 1);
    setBtnDisabled(true);
  };

  const { Title, Director, Year, Plot, Poster } = movieDetails;

  if (Title === 'null') {
    getMovieDetails(imdbID);
  }

  return (
    <div id="details-card">
      <h2>{Title}</h2>
      <p>
        {Year}
        <br />
        {Director}
        <br />
        <br />
        {Plot}
      </p>
      <img className="movie-poster" src={Poster} alt={`Poster for ${Title}`} />
      <div id="like-btn-container">
        {likes}
        &nbsp;&nbsp;
        <button
          className="like-btn"
          id="thumbs-up-btn"
          type="button"
          disabled={btnDisabled}
          onClick={onLike}
        >
          <i className="fa fa-thumbs-up" aria-hidden="true" />
        </button>
        <button
          className="like-btn"
          id="thumbs-down-btn"
          type="button"
          disabled={btnDisabled}
          onClick={onDislike}
        >
          <i className="fa fa-thumbs-down" aria-hidden="true" />
        </button>
        &nbsp;&nbsp;
        {dislikes}
      </div>
      <br />
    </div>
  );
};

export default DetailsContainer;
