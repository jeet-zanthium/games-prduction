import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import express from 'express';

import { errorMiddleware } from '@/app/middlewares/error.middleware';
import { notFoundMiddleware } from '@/app/middlewares/not-found.middleware';
import authRouter from '@/app/routes/auth.routes';
import usersRouter from '@/app/routes/users.routes';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use('/users', usersRouter);

app.use('/auth', authRouter);

// Health check endpoint
app.get('/health-check', (_, res) => {
  res.send('Server is running');
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
