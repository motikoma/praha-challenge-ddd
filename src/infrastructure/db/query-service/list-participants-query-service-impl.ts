import { Injectable } from '@nestjs/common';
import {
  IListParticipantsQueryService,
  Filter,
} from 'src/application/participant/query-service/list-participants-query-service';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Page, Paging } from 'src/domain/shared/page';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListParticipantsQueryService
  implements IListParticipantsQueryService
{
  constructor(private readonly prismaService: PrismaService) {}
  async list(filter: Filter): Promise<Page<Participant>> {
    const createWhere = (filter: Filter) => {
      if (!filter.taskStatus && filter.taskIds.length === 0) {
        return {
          // https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
          ParticipantOnTask: undefined,
        };
      }

      if (!filter.taskStatus) {
        return {
          ParticipantOnTask: {
            some: {
              taskId: {
                in: filter.taskIds,
              },
            },
          },
        };
      }

      if (filter.taskIds.length === 0) {
        return {
          ParticipantOnTask: {
            some: {
              taskStatusId: {
                equals: filter.taskStatus,
              },
            },
          },
        };
      }

      return {
        ParticipantOnTask: {
          some: {
            taskId: {
              in: filter.taskIds,
            },
            taskStatusId: {
              equals: filter.taskStatus,
            },
          },
        },
      };
    };

    const createSkip = (filter: Filter) => {
      if (filter.pagingCondition.pageNumber <= 0)
        throw new InfraException('ページ番号は1以上を指定してください');

      return (
        filter.pagingCondition.pageSize *
        (filter.pagingCondition.pageNumber - 1)
      );
    };

    try {
      const participants = await this.prismaService.participant.findMany({
        where: createWhere(filter),
        orderBy: {
          createdAt: 'desc',
        },
        skip: createSkip(filter),
        take: filter.pagingCondition.pageSize,
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
                participant.ParticipantOnEnrollmentStatus[0]!
                  .enrollmentStatusId,
            }),
          },
        });
        return participantEntity;
      });

      const paging = new Paging(
        filter.pagingCondition.pageSize,
        filter.pagingCondition.pageNumber,
      );
      const page = new Page<Participant>(participantEntities, paging);
      return page;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }
}
