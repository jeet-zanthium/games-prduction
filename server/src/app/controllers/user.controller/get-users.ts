import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';
import { prisma } from '@/db';

const getUsersQuerySchema = z.object({
  page: z.coerce.number({ message: 'Page must be a number' }).default(1),
  size: z.coerce.number({ message: 'Size must be a number' }).default(10),
  withAdmin: z.coerce
    .boolean({ message: 'Admin must be a boolean (true or false)' })
    .default(false),
  withWallet: z.coerce
    .boolean({ message: 'Wallet must be a boolean (true or false)' })
    .default(false),
  latest: z.coerce.boolean({
    message: 'Latest must be a boolean (true or false)',
  }),
});

export const getUsers = catchAsyncError(async (req, res) => {
  const { page, size, withAdmin, withWallet, latest } =
    getUsersQuerySchema.parse(req.query);

  const take = size;
  const skip = (page - 1) * take;

  const count = await prisma.user.count({
    where: withAdmin ? undefined : { role: 'USER' },
  });

  const users = await prisma.user.findMany({
    where: withAdmin ? undefined : { role: 'USER' },
    include: {
      wallet: withWallet,
    },
    take,
    skip,
    orderBy: latest ? { createdAt: 'desc' } : { id: 'asc' },
  });

  res.json({
    success: true,
    message: 'Users fetched successfully',
    data: {
      totalPages: Math.ceil(count / take),
      currentPage: page,
      users,
    },
  });
});
