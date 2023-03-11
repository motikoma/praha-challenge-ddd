import { Body, Controller, Param, Put } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { RemovePairUseCase } from 'src/application/team/pair/remove-pair-usecase';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { PrismaService } from 'src/prisma.service';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly pairId!: string;
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
export class TeamRemovePairController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put('/:teamId/removePair')
  async deleteTeam(
    @Param('teamId') teamId: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const repository = new TeamRepository(this.prismaService);
    const usecase = new RemovePairUseCase(repository);
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
