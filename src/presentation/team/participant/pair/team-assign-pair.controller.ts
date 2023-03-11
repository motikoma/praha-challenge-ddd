import { Body, Controller, Param, Put } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { AssignPairUseCase } from 'src/application/team/pair/assign-pair-usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { PrismaService } from 'src/prisma.service';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly pairName!: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly participantIds!: string[];
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
export class TeamAssignPairController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put('/:teamId/assignPair')
  async assignPairToTeam(
    @Param('teamId') teamId: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const teamRepository = new TeamRepository(this.prismaService);
    const participantRepository = new ParticipantRepository(this.prismaService);
    const usecase = new AssignPairUseCase(
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
