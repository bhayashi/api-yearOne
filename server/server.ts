import express from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';

require('dotenv').config();

const PORT = 3000;
const app = express();
app.use(cors());

const omdbKey: string =
  typeof process.env.OMDB_KEY === 'string' ? process.env.OMDB_KEY : '';

app.use(express.static('public'));

app.use('/build', express.static(path.resolve(__dirname, '../../build')));

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => console.log('Listening on 3000'));
