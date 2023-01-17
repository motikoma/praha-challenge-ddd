import { PrismaClient } from '@prisma/client';
import { ICheckAssignedTeamService } from 'src/domain/domain-service/check-assined-team-service';
import { UniqueID } from 'src/domain/shared/uniqueId';

export class CheckAssignedTeamService implements ICheckAssignedTeamService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async checkAssignedTeam(participantId: UniqueID) {
    const teamEntity = await this.prismaClient.participantOnTeam.findUnique({
      where: {
        participantId: participantId.id,
      },
    });

    if (teamEntity === null) return null;
    return true;
  }
}
