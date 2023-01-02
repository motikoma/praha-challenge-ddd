import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateParticipantUseCase } from 'src/application/participant/create-participant.usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly lastName!: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly mailAddress!: string;
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
export class ParticipantCreateController {
  @Post()
  async createParticipant(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new ParticipantRepository(prisma);
    const usecase = new CreateParticipantUseCase(repository);
    const result = await usecase.do(req);

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
