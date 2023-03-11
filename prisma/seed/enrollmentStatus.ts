import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const enrollmentStatusData: Prisma.EnrollmentStatusCreateInput[] = [
  {
    id: 1,
    status: '在籍中',
  },
  {
    id: 2,
    status: '休会中',
  },
  {
    id: 3,
    status: '退会済み',
  },
];

const prisma = new PrismaService();

export const enrollmentStatusSeedCreate = async () => {
  for (const d of enrollmentStatusData) {
    const data = await prisma.enrollmentStatus.create({
      data: d,
    });
  }
};
