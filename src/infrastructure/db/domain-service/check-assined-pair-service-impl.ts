import { PrismaClient } from '@prisma/client';
import { ICheckAssignedPairService } from 'src/domain/domain-service/check-assined-pair-service';
import { UniqueID } from 'src/domain/shared/uniqueId';

export class CheckAssignedPairService implements ICheckAssignedPairService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async checkAssignedPair(participantId: UniqueID) {
    const pairEntity = await this.prismaClient.participantOnPair.findUnique({
      where: {
        participantId: participantId.id,
      },
    });

    if (pairEntity === null) return null;
    return true;
  }
}
