import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { CustomError } from '@/utils/custom-error';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { env } from '@/config/env';
import { prisma } from '@/db';

const loginSchema = z.object({
  phone: z.string({ message: 'Phone number must be a string' }).length(10, {
    message: 'Phone number must be exactly 10 digits',
  }),
  password: z.string({ message: 'Password must be a string' }).min(4, {
    message: 'Password must be at least 4 characters',
  }),
});

export const login = catchAsyncError(async (req, res) => {
  const { phone, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findFirst({
    where: {
      phone,
      password,
    },
  });

  if (!user) {
    throw new CustomError(404, 'Invalid phone number or password.');
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000,
  });

  res.json({ success: true, message: 'Login successful' });
});
