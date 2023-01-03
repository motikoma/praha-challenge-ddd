import { PrismaClient } from '@prisma/client';
import {
  IListParticipantQueryService,
  Filter,
} from 'src/application/participant/query-service/list-participants-query-service';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';

export class ListParticipantQueryService
  implements IListParticipantQueryService
{
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async list(filter: Filter): Promise<Participant[]> {
    const participants = await this.prismaClient.participant.findMany({
      where: {
        ParticipantOnTask: {
          some: {
            taskId: {
              in: filter.taskIds,
            },
          },
        },
        AND: {
          ParticipantOnTask: {
            every: {
              Task: {
                taskStatusId: {
                  equals: filter.taskStatus,
                },
              },
            },
          },
        },
      },
      include: {
        ParticipantOnEnrollmentStatus: true,
        ParticipantMailAddress: true,
      },
    });

    const participantEntities = participants.map((participant) => {
      const participantEntity = Participant.reconstruct({
        id: UniqueID.reconstruct(participant.id),
        values: {
          name: ParticipantName.reconstruct({
            lastName: participant.lastName,
            firstName: participant.firstName,
          }),
          mailAddress: MailAddress.reconstruct({
            mailAddress: participant.ParticipantMailAddress[0]!.mailAddress,
          }),
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value:
              participant.ParticipantOnEnrollmentStatus[0]!.enrollmentStatusId,
          }),
        },
      });

      return participantEntity;
    });

    return participantEntities;
  }
}
