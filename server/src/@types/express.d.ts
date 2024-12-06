// src/types/express.d.ts
import { User } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Application {
      io?: SocketIOServer; // Augment Express.Application to include io
    }

    interface Request {
      user?: User; // Augment Express.Request to include user
    }
  }
}
