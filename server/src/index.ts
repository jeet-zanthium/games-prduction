import { createServer } from 'http';
import { Server } from 'socket.io';

import app from '@/app/app';
import { env } from '@/config/env';
import { initSocketServer } from '@/sockets/socket.server';

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
