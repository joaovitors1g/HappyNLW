import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';

import './database/connection';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use((req, res, next) => {
   req.io = io;
   next();
});

io.on('connection', (socket: Socket) => {
   console.log(`New socket connected: ${socket.id}`);
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.use(routes);

app.listen(3333, () => {
  console.log('App listening at port 3333 🚀');
});
