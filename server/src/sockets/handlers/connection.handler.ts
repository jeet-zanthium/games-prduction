import { Server, Socket } from 'socket.io';

export const handleConnection = (socket: Socket, io: Server) => {
  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    io.emit('message', `Echo: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
