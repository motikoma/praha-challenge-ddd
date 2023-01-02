import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ListParticipantsUseCase } from 'src/application/participant/list-participants.usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

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
  async listParticipants(): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new ParticipantRepository(prisma);
    const usecase = new ListParticipantsUseCase(repository);
    const result = await usecase.do();

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
