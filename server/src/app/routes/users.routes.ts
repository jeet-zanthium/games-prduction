import { Router } from 'express';

import { userController } from '@/app/controllers/user.controller';
import { authenticate, verifyRoles } from '@/app/middlewares/auth.middleware';

const usersRouter = Router();

usersRouter.get('/me', authenticate, userController.getMe);
usersRouter.get(
  '/:id',
  authenticate,
  verifyRoles('ADMIN'),
  userController.getUser
);
usersRouter.get(
  '/',
  authenticate,
  verifyRoles('ADMIN'),
  userController.getUsers
);

export default usersRouter;
