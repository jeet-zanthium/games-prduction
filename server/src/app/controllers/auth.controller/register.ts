import { z } from 'zod';

import { CustomError } from '@/utils/custom-error';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { generateCode } from '@/app/helpers/generate-code';
import { prisma } from '@/db';

const registerSchema = z.object({
  referralCode: z.string({
    message: 'Referral code must be a string',
  }),
  name: z
    .string({ message: 'Name must be a string' })
    .max(255, { message: 'Name must be less than 255 characters' }),
  phone: z.string({ message: 'Phone number must be a string' }).length(10, {
    message: 'Phone number must be exactly 10 digits',
  }),
  password: z.string({ message: 'Password must be a string' }).min(4, {
    message: 'Password must be at least 4 characters',
  }),
});

export const register = catchAsyncError(async (req, res) => {
  const { referralCode, name, phone, password } = registerSchema.parse(
    req.body
  );

  const referrer = await prisma.user.findUnique({
    where: {
      referralCode,
    },
    select: {
      id: true,
    },
  });

  if (!referrer) {
    throw new CustomError(404, 'Invalid referral code');
  }

  const existingUser = await prisma.user.count({
    where: {
      phone,
    },
  });

  if (existingUser > 0) {
    throw new CustomError(400, 'Phone number already exists');
  }

  await prisma.$transaction(async (trx) => {
    const user = await trx.user.create({
      data: {
        name,
        phone,
        password,
        referredBy: referrer.id,
      },
      select: {
        id: true,
      },
    });

    await trx.user.update({
      where: {
        id: user.id,
      },
      data: {
        referralCode: generateCode(user.id),
      },
    });

    let level = 1;
    let currentReferrerId: number | null = referrer.id;

    while (currentReferrerId) {
      await trx.userChildren.create({
        data: {
          userId: currentReferrerId,
          childId: user.id,
          level,
        },
      });

      const nextReferrer: { referredBy: number | null } | null =
        await trx.user.findUnique({
          where: {
            id: currentReferrerId,
          },
          select: {
            referredBy: true,
          },
        });

      currentReferrerId = nextReferrer?.referredBy || null;
      level++;
    }
  });

  res
    .status(201)
    .json({ success: true, message: 'User registered successfully' });
});
