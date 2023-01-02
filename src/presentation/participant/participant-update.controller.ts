import { Body, Controller, Param, Patch, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateParticipantUseCase } from 'src/application/participant/update-participant.usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { IsNotEmpty, IsNumber } from 'class-validator';
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
export class ParticipantUpdateController {
  @Put('/:id')
  async updateParticipant(
    @Param('id') id: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new ParticipantRepository(prisma);
    const usecase = new UpdateParticipantUseCase(repository);
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
