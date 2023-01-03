import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ListParticipantsUseCase } from 'src/application/participant/list-participants.usecase';
import { ListParticipantQueryService } from 'src/infrastructure/db/query-service/list-participant-query-service-impl';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

class RequestBody {
  @IsNotEmpty()
  @IsArray()
  readonly taskIds!: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly taskStatus!: number;
}

class ResponseBody {
  constructor(private readonly values: Participant[]) {}
}

class Participant {
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
export class ParticipantListController {
  @Get()
  async listParticipants(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new ParticipantRepository(prisma);
    const queryService = new ListParticipantQueryService(prisma);
    const usecase = new ListParticipantsUseCase(repository, queryService);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.map((participant) => {
        return new Participant(
          participant.id,
          participant.lastName,
          participant.firstName,
          participant.mailAddress,
          participant.enrollmentStatus,
        );
      }),
    );

    return response;
  }
}
