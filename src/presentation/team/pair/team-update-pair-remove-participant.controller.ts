import { Body, Controller, Param, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePairRemoveParticipantUseCase } from 'src/application/team/pair/update-pair-remove-participantupdate-usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly pairId!: string;

  @IsNotEmpty()
  @IsString()
  readonly participantId!: string;
}

class ResponseBody {
  constructor(
    private readonly teamId: string,
    private readonly teamName: number,
    private readonly participantIds: string[],
    private readonly pairIds: string[],
  ) {}
}

@Controller({
  path: '/teams',
})
export class TeamUpdatePairRemoveParticipantController {
  @Put('/:teamId')
  async deleteTeam(
    @Param('teamId') teamId: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const teamRepository = new TeamRepository(prisma);
    const participantRepository = new ParticipantRepository(prisma);
    const usecase = new UpdatePairRemoveParticipantUseCase(
      teamRepository,
      participantRepository,
    );
    const result = await usecase.do(teamId, req);

    const response = new ResponseBody(
      result.id,
      result.teamName,
      result.participantIds,
      result.pairIds,
    );

    return response;
  }
}
