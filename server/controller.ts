import { NextFunction } from 'express';
import db from './dbModel';

const dbController = {};

dbController.getMovie = (req: Request, res: any, next: NextFunction) => {
  const imdbID = req.body;
  const movie = `
    SELECT * FROM movie_likes
    WHERE imdbid = ${imdbID}
  `;
  db.query(movie)
    .then((response: any) => {
      res.locals.movie = response.rows;
      return next();
    })
    .catch((err: Error) => next(err));
};

module.exports = dbController;

/*
CREATE TABLE movie_likes (
  id serial PRIMARY KEY,
  imdbid VARCHAR ( 20 ) UNIQUE NOT NULL,
  title VARCHAR ( 200 ) NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL
);
*/
