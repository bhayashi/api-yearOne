/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetails } from '../utils/interfaces';

// Container for Movie Details
const DetailsContainer = () => {
  const { imdbID } = useParams<{ imdbID: string }>();

  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    Title: '',
    Director: '',
    Year: '',
    Plot: '',
    Poster: '',
  });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { Title, Director, Year, Plot, Poster } = movieDetails;

  // fetches movie details from OMDB API based on the imdbID
  async function getMovieDetails(id: string): Promise<void> {
    await fetch('/omdb/details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ omdbID: id }),
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        setMovieDetails(response);
      })
      .catch((err: Error) => console.error(err));
  }

  // fetches data about likes and dislikes from postgreSQL database
  async function getMovieLikesData(id: string, title: string): Promise<void> {
    await fetch('/likes/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imdbID: id, title }),
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response.rowCount > 0) {
          const data = response.rows[0];
          setLikes(data.likes);
          setDislikes(data.dislikes);
        }
      })
      .catch((err: Error) => console.log(err));
  }

  // posts data about likes and dislikes to postgreSQL database
  async function likeMovie(
    id: string,
    up: number,
    down: number,
    title: string
  ): Promise<void> {
    await fetch('/likes/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imdbID: id, likes: up, dislikes: down, title }),
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response.likes > likes) {
          setLikes(response.likes);
        }
        if (response.dislikes > dislikes) {
          setDislikes(response.dislikes);
        }
      })
      .catch((err: Error) => console.log(err));
  }

  // fetches movie details from OMDB API and likes data from postgreSQL database
  useEffect(() => {
    getMovieDetails(imdbID);
    getMovieLikesData(imdbID, Title);
  }, []);

  // clicking like or dislike disables both buttons
  const onLike = () => {
    setLikes(likes + 1);
    likeMovie(imdbID, likes + 1, dislikes, Title);
    setBtnDisabled(true);
  };

  const onDislike = () => {
    setDislikes(dislikes + 1);
    likeMovie(imdbID, likes, dislikes + 1, Title);
    setBtnDisabled(true);
  };

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
