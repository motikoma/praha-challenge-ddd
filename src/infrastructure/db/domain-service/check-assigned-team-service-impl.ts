import { Injectable } from '@nestjs/common';
import { ICheckAssignedTeamService } from 'src/domain/domain-service/update-participant-for-enrolled-domain-service';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckAssignedTeamService implements ICheckAssignedTeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkAssignedTeam(participantId: UniqueID) {
    try {
      const teamEntity = await this.prismaService.participantOnTeam.findUnique({
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
