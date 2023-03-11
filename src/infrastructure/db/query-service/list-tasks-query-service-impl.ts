import { Injectable } from '@nestjs/common';
import { TaskDto } from 'src/application/task/list-tasks.usecase';
import { IListTasksQueryService } from 'src/application/task/query-service/list-tasks-query-service';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListTasksQueryService implements IListTasksQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async listWithOwnerId(ownerId: UniqueID): Promise<TaskDto[]> {
    const tasks = await this.prismaService.participantOnTask.findMany({
      where: {
        participantId: ownerId.id,
      },
      include: {
        Task: true,
      },
    });

    const taskEntities = tasks.map((task) => {
      const taskEntity = new TaskDto(
        task.Task.id,
        task.participantId,
        task.Task.taskName,
        task.taskStatusId,
      );

      return taskEntity;
    });

    return taskEntities;
  }
}
