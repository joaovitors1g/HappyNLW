import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.use(routes);

app.listen(3333, () => {
  console.log('App listening at port 3333 🚀');
});
