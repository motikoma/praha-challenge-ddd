import { Prisma, PrismaClient } from '@prisma/client';

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

const prisma = new PrismaClient();

export const teamSeedCreate = async () => {
  for (const d of teamData) {
    const data = await prisma.team.create({
      data: d,
    });
  }
};
