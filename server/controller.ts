import { NextFunction } from 'express';
// import db from './dbModel';
const db = require('./dbModel');

// interface DBController {
//   getMovie: () => void;
// }

const dbController: any = {};

dbController.getMovie = (req: any, res: any, next: NextFunction): void => {
  const { imdbID } = req.body;
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
// export default dbController;

/*
CREATE TABLE movie_likes (
  id serial PRIMARY KEY,
  imdbid VARCHAR ( 20 ) UNIQUE NOT NULL,
  title VARCHAR ( 200 ) NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL
);

INSERT INTO movie_likes (imdbid, title, likes, dislikes)
VALUES ('tt0454349', 'Inception', 42, 5);
*/
