import { Body, Controller, Post } from '@nestjs/common';
import { CreateParticipantUseCase } from 'src/application/participant/create-participant.usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
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
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createParticipant(@Body() req: RequestBody): Promise<ResponseBody> {
    const repository = new ParticipantRepository(this.prismaService);
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
