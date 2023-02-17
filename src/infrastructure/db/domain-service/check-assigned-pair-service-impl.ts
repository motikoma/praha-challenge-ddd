import { PrismaClient } from '@prisma/client';
import { ICheckAssignedPairService } from 'src/application/participant/domain-service/update-participant-domain-service';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';

export class CheckAssignedPairService implements ICheckAssignedPairService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async checkAssignedPair(participantId: UniqueID) {
    try {
      const pairEntity = await this.prismaClient.participantOnPair.findUnique({
        where: {
          participantId: participantId.id,
        },
      });

      if (pairEntity === null) return null;
      return true;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }
}
