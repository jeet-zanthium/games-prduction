import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log(chalk.cyan('Query: ') + chalk.yellow(e.query));
  console.log(chalk.cyan('Params: ') + chalk.green(e.params));
  console.log(chalk.cyan('Duration: ') + chalk.magenta(e.duration + 'ms'));
  console.log(chalk.red('----------------------------------'));
});

export { prisma };
