import { NextFunction } from 'express';

const db = require('./dbModel');

// interface DBController {
//   getMovie: () => void;
// }

const dbController: any = {};

dbController.getMovie = (req: any, res: any, next: NextFunction): void => {
  const { imdbID } = req.body;
  const getMovieByImdbID = `
    SELECT * FROM movie_likes
    WHERE imdbid = '${imdbID}'
  `;
  db.query(getMovieByImdbID)
    .then((response: any) => {
      res.locals.movie = response;
      return next();
    })
    .catch((err: Error) => next(err));
};

dbController.updateMovie = (req: any, res: any, next: NextFunction): void => {
  const { imdbID, title, likes, dislikes } = req.body;
  //   const values = [imdbID, title, likes, dislikes];
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
