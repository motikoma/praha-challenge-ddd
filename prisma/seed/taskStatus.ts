import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const taskStatusData: Prisma.TaskStatusCreateInput[] = [
  {
    id: 1,
    status: '未着手',
  },
  {
    id: 2,
    status: 'レビュー待ち',
  },
  {
    id: 3,
    status: '完了',
  },
];

const prisma = new PrismaService();

export const taskStatusDataCreate = async () => {
  for (const d of taskStatusData) {
    const data = await prisma.taskStatus.create({
      data: d,
    });
  }
};
