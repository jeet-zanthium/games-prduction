import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/utils/custom-error';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { env } from '@/config/env';
import { prisma } from '@/db';

// Authentication middleware
export const authenticate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new CustomError(401, 'Unauthorized');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      throw new CustomError(401, 'Unauthorized');
    }

    req.user = user; // Attach user to the request object

    const newToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    next();
  }
);

// Verify roles middleware
export const verifyRoles = (...roles: Role[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new CustomError(403, 'Forbidden');
    }
    next();
  };
};
