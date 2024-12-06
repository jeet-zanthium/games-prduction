import { login } from '@/app/controllers/auth.controller/login';
import { logout } from '@/app/controllers/auth.controller/logout';
import { register } from '@/app/controllers/auth.controller/register';

export const authController = {
  register,
  login,
  logout,
};
