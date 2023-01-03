import { PrismaClient } from '@prisma/client';
import { Task } from 'src/domain/entity/task/task';
import { TaskName } from 'src/domain/entity/task/task-name';
import { ITaskRepository } from 'src/domain/entity/task/task-repository';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { UniqueID } from 'src/domain/shared/uniqueID';

export class TaskRepository implements ITaskRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async create(task: Task) {
    const result = await this.prismaClient.participantOnTask.create({
      data: {
        participantId: task.ownerId.id,
        taskId: task.id.id,
        taskStatusId: task.taskStatus.value,
      },
      include: {
        Task: true,
      },
    });

    const taskEntity = Task.create({
      id: UniqueID.reconstruct(result.taskId),
      values: {
        ownerId: UniqueID.reconstruct(result.participantId),
        taskName: TaskName.create({ taskName: result.Task.taskName }),
        taskStatus: TaskStatus.reconstruct({
          value: result.taskStatusId,
        }),
      },
    });

    return taskEntity;
  }

  async listWithOwnerId(ownerId: UniqueID) {
    const tasks = await this.prismaClient.participantOnTask.findMany({
      where: {
        participantId: ownerId.id,
      },
      include: {
        Task: true,
      },
    });

    const taskEntities = tasks.map((task) => {
      return Task.create({
        id: UniqueID.reconstruct(task.taskId),
        values: {
          ownerId: UniqueID.reconstruct(task.participantId),
          taskName: TaskName.create({ taskName: task.Task.taskName }),
          taskStatus: TaskStatus.reconstruct({
            value: task.taskStatusId,
          }),
        },
      });
    });

    return taskEntities;
  }

  async get(ownerId: UniqueID, taskId: UniqueID) {
    const task = await this.prismaClient.participantOnTask.findUnique({
      where: {
        participantId_taskId: {
          participantId: ownerId.id,
          taskId: taskId.id,
        },
      },
      select: {
        participantId: true,
        taskId: true,
        taskStatusId: true,
        Task: {
          select: {
            taskName: true,
          },
        },
      },
    });

    if (!task) return null;

    const taskEntity = Task.create({
      id: UniqueID.reconstruct(task.taskId),
      values: {
        ownerId: UniqueID.reconstruct(task.participantId),
        taskName: TaskName.create({ taskName: task.Task.taskName }),
        taskStatus: TaskStatus.reconstruct({
          value: task.taskStatusId,
        }),
      },
    });

    return taskEntity;
  }

  async updateStatus(task: Task) {
    const { taskStatus, ownerId } = task.values;
    const updatedTask = await this.prismaClient.participantOnTask.update({
      where: {
        participantId_taskId: {
          participantId: ownerId.id,
          taskId: task.id.id,
        },
      },
      data: {
        taskStatusId: taskStatus.value,
      },
      include: {
        Task: {
          select: {
            taskName: true,
          },
        },
      },
    });

    const updatedTaskEntity = Task.create({
      id: UniqueID.reconstruct(updatedTask.taskId),
      values: {
        ownerId: UniqueID.reconstruct(updatedTask.participantId),
        taskName: TaskName.create({ taskName: updatedTask.Task.taskName }),
        taskStatus: TaskStatus.reconstruct({
          value: updatedTask.taskStatusId,
        }),
      },
    });

    return updatedTaskEntity;
  }
}
