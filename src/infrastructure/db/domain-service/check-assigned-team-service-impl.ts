import { PrismaClient } from '@prisma/client';
import { ICheckAssignedTeamService } from 'src/application/participant/domain-service/update-participant-domain-service';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';

export class CheckAssignedTeamService implements ICheckAssignedTeamService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async checkAssignedTeam(participantId: UniqueID) {
    try {
      const teamEntity = await this.prismaClient.participantOnTeam.findUnique({
        where: {
          participantId: participantId.id,
        },
      });

      if (teamEntity === null) return null;
      return true;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }
}
