import { Request, Response } from 'express';

const express = require('express');
const dbController = require('../dbController');

const router = express.Router();

router.post('/data', dbController.getMovie, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.movie);
});

router.post(
  '/update',
  dbController.getMovie,
  dbController.updateMovie,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.movie);
  }
);

module.exports = router;
