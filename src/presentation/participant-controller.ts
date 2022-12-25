import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateParticipantUseCase } from 'src/application/create-participant-usecase';
import { ParticipantRepository } from 'src/infrastructure/repository/participant-repository-impl';
import { RequestBody } from './request-body';

@Controller({
  path: '/participants',
})
export class ParticipantController {
  @Post()
  async createParticipant(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new ParticipantRepository(prisma);
    const usecase = new CreateParticipantUseCase(repository);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.id.id,
      result.name.lastName,
      result.name.firstName,
      result.mailAddress.mailAddress,
      result.enrollmentStatus.value,
    );

    return response;
  }
}

class ResponseBody {
  constructor(
    private readonly id: string,
    private readonly lastName: string,
    private readonly firstName: string,
    private readonly mailAddress: string,
    private readonly enrollmentStatus: string,
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.mailAddress = mailAddress;
    this.enrollmentStatus = enrollmentStatus;
  }

  // public getAllProperties() {
  //   return {
  //     id: this.id,
  //     lastName: this.lastName,
  //     firstName: this.firstName,
  //     mailAddress: this.mailAddress,
  //     enrollmentStatus: this.enrollmentStatus,
  //   };
  // }
}
