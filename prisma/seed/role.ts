import { Prisma, PrismaClient } from '@prisma/client';

const roleData: Prisma.RoleCreateInput[] = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
];

const prisma = new PrismaClient();

export const roleSeedCreate = async () => {
  for (const d of roleData) {
    const data = await prisma.role.create({
      data: d,
    });
  }
};
