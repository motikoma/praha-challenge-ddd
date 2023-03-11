import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/entity/task/task';
import { ITaskRepository } from 'src/domain/entity/task/task-repository';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { UniqueID } from 'src/domain/shared/uniqueID';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(task: Task) {
    try {
      const result = await this.prismaService.participantOnTask.create({
        data: {
          participantId: task.ownerId.id,
          taskId: task.id.id,
          taskStatusId: task.taskStatus.value,
        },
      });

      const taskEntity = Task.create({
        id: UniqueID.reconstruct(result.taskId),
        values: {
          ownerId: UniqueID.reconstruct(result.participantId),
          taskStatus: TaskStatus.reconstruct({
            value: result.taskStatusId,
          }),
        },
      });

      return taskEntity;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }

  async get(ownerId: UniqueID, taskId: UniqueID) {
    try {
      const task = await this.prismaService.participantOnTask.findUnique({
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
        },
      });

      if (!task) return null;

      const taskEntity = Task.create({
        id: UniqueID.reconstruct(task.taskId),
        values: {
          ownerId: UniqueID.reconstruct(task.participantId),
          taskStatus: TaskStatus.reconstruct({
            value: task.taskStatusId,
          }),
        },
      });

      return taskEntity;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }

  async updateStatus(task: Task) {
    const { taskStatus, ownerId } = task.values;

    try {
      const updatedTask = await this.prismaService.participantOnTask.update({
        where: {
          participantId_taskId: {
            participantId: ownerId.id,
            taskId: task.id.id,
          },
        },
        data: {
          taskStatusId: taskStatus.value,
        },
      });

      const updatedTaskEntity = Task.create({
        id: UniqueID.reconstruct(updatedTask.taskId),
        values: {
          ownerId: UniqueID.reconstruct(updatedTask.participantId),
          taskStatus: TaskStatus.reconstruct({
            value: updatedTask.taskStatusId,
          }),
        },
      });

      return updatedTaskEntity;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }
}
