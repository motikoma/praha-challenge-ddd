import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const teamData: Prisma.TeamCreateInput[] = [
  {
    id: '1',
    teamName: 1,
  },
  {
    id: '2',
    teamName: 2,
  },
];

const prisma = new PrismaService();

export const teamSeedCreate = async () => {
  for (const d of teamData) {
    const data = await prisma.team.create({
      data: d,
    });
  }
};
