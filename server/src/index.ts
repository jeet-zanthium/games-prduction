import { createServer } from 'http';
import { Server } from 'socket.io';

import app from '@/app/app';
import { env } from '@/config/env';
import { initSocketServer } from '@/sockets/socket.server';

import { prisma } from './db';

// Create HTTP server and attach Express app
const PORT = env.PORT || 3000;
const httpServer = createServer(app);

// Initialize Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL || '*',
  },
});
initSocketServer(io);

app.io = io;

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Server is terminating...');
  await prisma.$disconnect();
  process.exit(0);
});

httpServer.on('close', async () => {
  console.log('Server is shutting down...');
  await prisma.$disconnect();
});
