import { getMe } from '@/app/controllers/user.controller/get-me';
import { getUser } from '@/app/controllers/user.controller/get-user';
import { getUsers } from '@/app/controllers/user.controller/get-users';

export const userController = { getMe, getUser, getUsers };
