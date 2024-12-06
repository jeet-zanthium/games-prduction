import { z } from 'zod';

import { CustomError } from '@/utils/custom-error';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { prisma } from '@/db';

const getUserParamsSchema = z.object({
  id: z.coerce.number({ message: 'Id must be a number' }),
});
const getUserQuerySchema = z.object({
  withWallet: z.coerce
    .boolean({ message: 'Wallet must be a boolean (true or false)' })
    .default(false),
});

export const getUser = catchAsyncError(async (req, res) => {
  const { id } = getUserParamsSchema.parse(req.params);
  const { withWallet } = getUserQuerySchema.parse(req.query);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      wallet: withWallet,
    },
  });

  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  res.json({
    success: true,
    message: 'User details fetched successfully',
    data: user,
  });
});
