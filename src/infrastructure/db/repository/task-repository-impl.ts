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
    const result = await this.prismaClient.task.create({
      data: {
        id: task.id.id,
        taskName: task.taskName.taskName,
        taskStatusId: task.taskStatus.value,
        ParticipantOnTask: {
          create: {
            participantId: task.ownerId.id,
          },
        },
      },
      include: {
        taskStatus: true,
        ParticipantOnTask: true,
      },
    });

    const taskEntity = Task.reconstruct({
      id: UniqueID.reconstruct(result.id),
      values: {
        ownerId: UniqueID.reconstruct(
          result.ParticipantOnTask[0].participantId,
        ),
        taskName: TaskName.create({ taskName: result.taskName }),
        taskStatus: TaskStatus.reconstruct({ value: result.taskStatusId }),
      },
    });

    return taskEntity;
  }

  async list() {
    const tasks = await this.prismaClient.task.findMany({
      include: {
        taskStatus: true,
        ParticipantOnTask: true,
      },
    });

    const taskEntities = tasks.map((task) => {
      return Task.reconstruct({
        id: UniqueID.reconstruct(task.id),
        values: {
          ownerId: UniqueID.reconstruct(
            task.ParticipantOnTask[0].participantId,
          ),
          taskName: TaskName.create({ taskName: task.taskName }),
          taskStatus: TaskStatus.reconstruct({ value: task.taskStatusId }),
        },
      });
    });

    return taskEntities;
  }

  async getWithId(taskId: UniqueID) {
    const { id } = taskId;
    const task = await this.prismaClient.task.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        taskName: true,
        taskStatusId: true,
        ParticipantOnTask: {
          select: {
            participantId: true,
          },
        },
      },
    });

    if (!task) return null;

    const taskEntity = Task.reconstruct({
      id: UniqueID.reconstruct(task.id),
      values: {
        ownerId: UniqueID.reconstruct(task.ParticipantOnTask[0].participantId),
        taskName: TaskName.create({ taskName: task.taskName }),
        taskStatus: TaskStatus.reconstruct({ value: task.taskStatusId }),
      },
    });

    return taskEntity;
  }

  async update(task: Task) {
    const { id } = task.id;
    const { taskName, taskStatus, ownerId } = task.values;
    const updatedTask = await this.prismaClient.task.update({
      where: {
        id: id,
      },
      data: {
        taskName: taskName.taskName,
        taskStatusId: taskStatus.value,
        ParticipantOnTask: {
          update: {
            where: {
              participantId_taskId: {
                participantId: ownerId.id,
                taskId: id,
              },
            },
            data: {
              participantId: ownerId.id,
            },
          },
        },
      },
      include: {
        taskStatus: true,
        ParticipantOnTask: true,
      },
    });

    const updatedTaskEntity = Task.reconstruct({
      id: UniqueID.reconstruct(updatedTask.id),
      values: {
        ownerId: UniqueID.reconstruct(
          updatedTask.ParticipantOnTask[0].participantId,
        ),
        taskName: TaskName.create({ taskName: updatedTask.taskName }),
        taskStatus: TaskStatus.reconstruct({ value: updatedTask.taskStatusId }),
      },
    });

    return updatedTaskEntity;
  }
}
