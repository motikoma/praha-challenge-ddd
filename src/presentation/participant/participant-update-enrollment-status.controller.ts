import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateParticipantEnrollmentStatusUseCase } from 'src/application/participant/update-participant-enrollment-status.usecase';
import { UpdatePairRemoveParticipantUseCase } from 'src/application/team/pair/update-pair-remove-participant';
import { RemoveParticipantUseCase } from 'src/application/team/participant/remove-participant-usecase';
import { UpdateParticipantForEnrolledDomainService } from 'src/domain/domain-service/update-participant-for-enrolled-domain-service';
import { ParticipantAuthHashed } from 'src/domain/entity/auth/participant-auth-hashed';
import { ROLE } from 'src/domain/entity/auth/role';
import { CheckAssignedPairService } from 'src/infrastructure/db/domain-service/check-assigned-pair-service-impl';
import { CheckAssignedTeamService } from 'src/infrastructure/db/domain-service/check-assigned-team-service-impl';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { JwtAuthGuard } from 'src/presentation/authentication/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { GetParticipantAuth } from '../authentication/get-participant-auth.decorator';
import { Role } from '../authorization/role.decorator';
import { RolesGuard } from '../authorization/roles.guard';

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
  constructor(private readonly prismaService: PrismaService) {}

  // TODO: EnrollmentStatusの種類ごとに分割する
  @Put('/:id/updateEnrollmentStatus')
  @Role(ROLE.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateParticipant(
    @Param('id') id: string,
    @Body() req: RequestBody,
    @GetParticipantAuth() participantAuthHashed: ParticipantAuthHashed,
  ): Promise<ResponseBody> {
    const teamRepository = new TeamRepository(this.prismaService);
    const participantRepository = new ParticipantRepository(this.prismaService);
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
        new CheckAssignedTeamService(this.prismaService),
        new CheckAssignedPairService(this.prismaService),
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
