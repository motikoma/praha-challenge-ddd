import { PrismaClient } from '@prisma/client';
import {
  IListParticipantsQueryService,
  Filter,
} from 'src/application/participant/query-service/list-participants-query-service';
import { TaskDto } from 'src/application/task/list-tasks.usecase';
import { IListTasksQueryService } from 'src/application/task/query-service/list-tasks-query-service';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Task } from 'src/domain/entity/task/task';
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
