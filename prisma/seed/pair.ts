import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const pairData: Prisma.PairCreateInput[] = [
  {
    id: '1',
    pairName: 'a',
  },
  {
    id: '2',
    pairName: 'b',
  },
  {
    id: '3',
    pairName: 'c',
  },
  {
    id: '4',
    pairName: 'd',
  },
];

const prisma = new PrismaService();

export const pairSeedCreate = async () => {
  for (const d of pairData) {
    const data = await prisma.pair.create({
      data: d,
    });
  }
};
