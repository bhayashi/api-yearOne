import express from 'express';
import path from 'path';
import cors from 'cors';

require('dotenv').config();

const PORT = 3000;
const app = express();
app.use(cors());

const uri: string =
  typeof process.env.HULU_API_KEY === 'string' ? process.env.HULU_API_KEY : '';

app.use(express.static('public'));

app.use('/build', express.static(path.resolve(__dirname, '../../build')));

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => console.log('Listening on 3000'));
