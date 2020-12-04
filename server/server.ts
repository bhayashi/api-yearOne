import express from 'express';
import path from 'path';
// import cors from 'cors';

require('dotenv').config();

const PORT = 3000;
const app = express();
// app.use(cors());

app.use(express.static('public'));

app.use('/build', express.static(path.resolve(__dirname, '../../build')));

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.use((_req, res) => res.sendStatus(404));

// global error handler
app.use((err, _req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, err };
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log('Listening on 3000'));
