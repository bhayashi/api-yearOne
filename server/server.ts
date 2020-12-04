import express from 'express';
import path from 'path';

import cors from 'cors';

const dbController = require('./controller');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
// require all interactions to use/parse JSON
app.use(express.json());
// handle form data correctly
app.use(express.urlencoded({ extended: true }));

app.use(express.static('index.html'));

app.use('/build', express.static(path.resolve(__dirname, '../../build')));

app.post('/movieLikesData', dbController.getMovie, (_req, res) => {
  res.status(200).json(res.locals.movie);
});

app.post(
  '/likeMovie',
  dbController.getMovie,
  dbController.updateMovie,
  (_req, res) => {
    res.status(200).json(res.locals.movie);
  }
);

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.use((_req, res) => res.sendStatus(404));

// global error handler
app.use((err, _req, res: any) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, err };
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
