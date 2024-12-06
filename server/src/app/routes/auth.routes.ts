import { Router } from 'express';

import { authController } from '@/app/controllers/auth.controller';
import { authenticate } from '@/app/middlewares/auth.middleware';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authenticate, authController.logout);

export default router;
