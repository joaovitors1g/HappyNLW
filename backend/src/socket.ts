import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { Express } from 'express';

export default class WebSocket {
   public readonly io: Server;
   public readonly app: Express;
   constructor(app: Express) {
      const server = createServer(app);
      const io = new Server(server);

      io.on('connection', (socket: Socket) => {
         console.log(`New socket connected: ${socket.id}`);
      });

      app.use((req, res, next) => {
         req.io = io;
         next();
      });

      this.app = app;

      this.io = io;
   }
}
