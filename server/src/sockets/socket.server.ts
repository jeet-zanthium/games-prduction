import { Server } from 'socket.io';

import { handleConnection } from '@/sockets/handlers/connection.handler';

export const initSocketServer = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    handleConnection(socket, io);
  });
};
