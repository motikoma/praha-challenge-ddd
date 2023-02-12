import { Prisma, PrismaClient } from '@prisma/client';

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

const prisma = new PrismaClient();

export const taskSeedCreate = async () => {
  for (const d of taskData) {
    const data = await prisma.task.create({
      data: d,
    });
  }
};
