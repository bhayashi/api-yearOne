import { NextFunction } from 'express';

const db = require('./dbModel');

// interface DBController {
//   getMovie: () => void;
// }

const dbController: any = {};

dbController.getMovie = (req: any, res: any, next: NextFunction): void => {
  const { imdbID, title } = req.body;
  const getMovieByImdbID = `
    SELECT * FROM movie_likes
    WHERE imdbid = '${imdbID}'
  `;
  db.query(getMovieByImdbID)
    .then((response: any) => {
      if (response.rowCount === 0) {
        const updateMovie = `
        INSERT INTO movie_likes (imdbid, title, likes, dislikes)
        VALUES('${imdbID}', '${title}', 0, 0)
        RETURNING *;
      `;
        db.query(updateMovie)
          .then((response2: any) => {
            res.locals.movie = response2;
            return next();
          })
          .catch((err: Error) => next(err));
      }
      res.locals.movie = response;
      return next();
    })
    .catch((err: Error) => next(err));
};

dbController.updateMovie = (req: any, res: any, next: NextFunction): void => {
  const { imdbID, title, likes, dislikes } = req.body;
  //   const values = [imdbID, title, likes, dislikes];
  //   console.log('VALUES: ', values);
  let updateMovie = `
      UPDATE movie_likes
      SET likes = '${likes}',
          dislikes = '${dislikes}'
      WHERE imdbid = '${imdbID}'
      RETURNING *;
    `;
  if (res.locals.movie.rowCount === 0) {
    updateMovie = `
        INSERT INTO movie_likes (imdbid, title, likes, dislikes)
        VALUES('${imdbID}', '${title}', ${likes}, ${dislikes})
        RETURNING *;
      `;
  }
  db.query(updateMovie)
    .then((response: any) => {
      res.locals.movie = response.rows[0];
      return next();
    })
    .catch((err: Error) => {
      console.log(err);
      return next(err);
    });
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

INSERT INTO movie_likes (imdbid, title, likes, dislikes)
VALUES ('tt0454349', 'Inception', 42, 5);
*/
