import { NextFunction, Request, Response } from 'express';

import { DBResult } from '../../client/utils/interfaces';

const db = require('../dbModel');

const dbController: any = {};

// queries postgreSQL database for likes and dislikes based on imdbID
dbController.getMovie = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { imdbID } = req.body;
  const getMovieByImdbID = `
    SELECT * FROM movie_likes
    WHERE imdbid = '${imdbID}';
  `;
  db.query(getMovieByImdbID)
    .then((response: DBResult) => {
      res.locals.movie = response;
      return next();
    })
    .catch((err: Error) => next(err));
};

// if movie exists in the database, the likes and dislikes get updated
// else the movie title, imdbID, likes, and dislikes get inserted into table
dbController.updateMovie = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { imdbID, title, likes, dislikes } = req.body;
  const Title = title.replace(/'/g, '&apos;');
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
        VALUES('${imdbID}', '${Title}', ${likes}, ${dislikes})
        RETURNING *;
      `;
  }
  db.query(updateMovie)
    .then((response: DBResult) => {
      [res.locals.movie] = response.rows;
      return next();
    })
    .catch((err: Error) => next(err));
};

module.exports = dbController;
