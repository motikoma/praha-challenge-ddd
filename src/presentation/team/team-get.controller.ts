import { Controller, Get, Param } from '@nestjs/common';
import { GetTeamUseCase } from 'src/application/team/get-team.usecase';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { PrismaService } from 'src/prisma.service';

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
export class TeamGetController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:teamId')
  async getTeam(@Param('teamId') teamId: string): Promise<ResponseBody> {
    const repository = new TeamRepository(this.prismaService);
    const usecase = new GetTeamUseCase(repository);
    const result = await usecase.do(teamId);

    const response = new ResponseBody(
      result.id,
      result.teamName,
      result.participantIds,
      result.pairIds,
    );

    return response;
  }
}
