import io from 'socket.io-client';

let socket: SocketIOClient.Socket;

export function connectSocket() {
   socket = io();

   console.log('Socket connected!');
}

export function getSocket() {
   return socket;
}
