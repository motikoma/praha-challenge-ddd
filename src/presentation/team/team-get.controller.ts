import { Controller, Get, Param, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetTeamUseCase } from 'src/application/team/get-team.usecase';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';

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
  @Get('/:id')
  async getTeam(@Param('id') id: string): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new TeamRepository(prisma);
    const usecase = new GetTeamUseCase(repository);
    const result = await usecase.do(id);

    const response = new ResponseBody(
      result.id,
      result.teamName,
      result.participantIds,
      result.pairIds,
    );

    return response;
  }
}
