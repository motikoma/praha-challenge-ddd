import { PrismaClient } from '@prisma/client';
import { TaskDto } from 'src/application/task/list-tasks.usecase';
import { IListTasksQueryService } from 'src/application/task/query-service/list-tasks-query-service';
import { UniqueID } from 'src/domain/shared/uniqueId';

export class ListTasksQueryService implements IListTasksQueryService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async listWithOwnerId(ownerId: UniqueID): Promise<TaskDto[]> {
    const tasks = await this.prismaClient.participantOnTask.findMany({
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
