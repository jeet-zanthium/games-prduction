import 'dotenv/config';

import { CONSTANTS } from '@/config/constants';
import { prisma } from '@/db';

async function main() {
  // Create Admin
  await prisma.user.create({
    data: {
      name: 'Admin',
      phone: '0000000000',
      password: 'admin123',
      referralCode: `${CONSTANTS.PREFIX}000001`,
      role: 'ADMIN',
      activatedAt: new Date(),
      activeStatus: 'ACTIVE',
      blockStatus: 'UN_BLOCKED',
    },
  });

  console.log('Admin created!');

  const users = await prisma.user.findMany({
    where: {
      role: 'ADMIN',
    },
  });

  console.log('Admins:', users);

  // await prisma.user.deleteMany({
  //   where: {
  //     role: 'ADMIN',
  //   },
  // });
}

main();
