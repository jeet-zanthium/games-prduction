import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { prisma } from '@/db';

const getMeQuerySchema = z.object({
  withWallet: z.coerce
    .boolean({ message: 'Wallet must be a boolean (true or false)' })
    .default(false),
});

export const getMe = catchAsyncError(async (req, res) => {
  const { withWallet } = getMeQuerySchema.parse(req.query);

  const user = await prisma.user.findUnique({
    where: {
      id: req.user!.id,
    },
    include: {
      wallet: withWallet,
    },
  });

  res.json({
    success: true,
    message: 'User details fetched successfully',
    data: user,
  });
});
