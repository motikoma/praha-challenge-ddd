import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const taskData: Prisma.TaskCreateInput[] = [
  {
    id: '1',
    taskName: 'タスク1',
  },
  {
    id: '2',
    taskName: 'タスク2',
  },
  {
    id: '3',
    taskName: 'タスク3',
  },
];

const prisma = new PrismaService();

export const taskSeedCreate = async () => {
  for (const d of taskData) {
    const data = await prisma.task.create({
      data: d,
    });
  }
};
