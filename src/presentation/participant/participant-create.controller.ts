import { Body, Controller, Post } from '@nestjs/common';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateParticipantUseCase } from 'src/application/participant/create-participant.usecase';
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

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  readonly password!: string;
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
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
  ) {}

  @Post()
  async createParticipant(@Body() req: RequestBody): Promise<ResponseBody> {
    const result = await this.createParticipantUseCase.do(req);

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
