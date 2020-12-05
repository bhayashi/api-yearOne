import { Request, Response } from 'express';

const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.post(
  '/search',
  apiController.searchOMDB,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.movieList);
  }
);

router.post(
  '/details',
  apiController.getMovieDetails,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.movieData);
  }
);

module.exports = router;
