import { NextFunction, Request, Response } from 'express';
import { MovieDetails, MovieSearchResult } from '../../client/utils/interfaces';

const axios = require('axios').default;
require('dotenv').config();

const apiController: any = {};

apiController.searchOMDB = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { OMDB_API_KEY } = process.env;
  const { search } = req.body;
  axios
    .get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}`)
    .then((response: { data: Array<MovieSearchResult> }) => {
      res.locals.movieList = response.data;
      return next();
    })
    .catch((err: Error) => console.error(err));
};

apiController.getMovieDetails = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { OMDB_API_KEY } = process.env;
  const { omdbID } = req.body;
  axios
    .get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${omdbID}`)
    .then((response: { data: MovieDetails }) => {
      res.locals.movieData = response.data;
      return next();
    })
    .catch((err: Error) => console.error(err));
};

module.exports = apiController;
