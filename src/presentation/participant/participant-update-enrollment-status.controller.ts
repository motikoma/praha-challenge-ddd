import { Body, Controller, Param, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateParticipantForEnrolledDomainService } from 'src/application/participant/domain-service/update-participant-for-enrolled-domain-service';
import { CheckAssignedPairService } from 'src/infrastructure/db/domain-service/check-assigned-pair-service-impl';
import { CheckAssignedTeamService } from 'src/infrastructure/db/domain-service/check-assigned-team-service-impl';
import { UpdatePairRemoveParticipantUseCase } from 'src/application/team/pair/update-pair-remove-participant';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { UpdateParticipantEnrollmentStatusUseCase } from 'src/application/participant/update-participant-enrollment-status.usecase';
import { RemoveParticipantUseCase } from 'src/application/team/participant/remove-participant-usecase';
class RequestBody {
  @IsNotEmpty()
  @IsNumber()
  readonly enrollmentStatus!: number;
}

class ResponseBody {
  constructor(
    private readonly id: string,
    private readonly lastName: string,
    private readonly firstName: string,
    private readonly mailAddress: string,
    private readonly enrollmentStatus: number,
  ) {}
}

@Controller({
  path: '/participants',
})
export class ParticipantUpdateEnrollmentStatusController {
  @Put('/:id')
  async updateParticipant(
    @Param('id') id: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const prisma = new PrismaClient();

    const teamRepository = new TeamRepository(prisma);
    const participantRepository = new ParticipantRepository(prisma);
    const updatePairRemoveParticipantUseCase =
      new UpdatePairRemoveParticipantUseCase(
        teamRepository,
        participantRepository,
      );
    const removeParticipantUseCase = new RemoveParticipantUseCase(
      teamRepository,
      participantRepository,
    );

    const updateParticipantForEnrolledDomainService =
      new UpdateParticipantForEnrolledDomainService(
        updatePairRemoveParticipantUseCase,
        removeParticipantUseCase,
        participantRepository,
        teamRepository,
        new CheckAssignedTeamService(prisma),
        new CheckAssignedPairService(prisma),
      );

    const usecase = new UpdateParticipantEnrollmentStatusUseCase(
      participantRepository,
      updateParticipantForEnrolledDomainService,
      teamRepository,
    );
    const result = await usecase.do(id, req);

    const response = new ResponseBody(
      result.id,
      result.lastName,
      result.firstName,
      result.mailAddress,
      result.enrollmentStatus,
    );

    return response;
  }
}
