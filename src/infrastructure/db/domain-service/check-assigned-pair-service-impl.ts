import { Injectable } from '@nestjs/common';
import { ICheckAssignedPairService } from 'src/domain/domain-service/update-participant-for-enrolled-domain-service';

import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckAssignedPairService implements ICheckAssignedPairService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkAssignedPair(participantId: UniqueID) {
    try {
      const pairEntity = await this.prismaService.participantOnPair.findUnique({
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
