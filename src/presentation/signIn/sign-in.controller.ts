import { Body, Controller, Post } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SignInUseCase } from 'src/application/signIn/sign-in.usecase';

class RequestBody {
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
  constructor(private readonly accessToken: string) {}
}

@Controller({
  path: '/signIn',
})
export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post()
  async createParticipant(@Body() req: RequestBody): Promise<ResponseBody> {
    const result = await this.signInUseCase.do(req);

    const response = new ResponseBody(result.accessToken);

    return response;
  }
}
