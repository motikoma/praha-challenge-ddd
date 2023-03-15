import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Response } from 'express';
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

@Controller({
  path: '/signIn',
})
export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(
    @Body() req: RequestBody,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.signInUseCase.do(req);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false, // ローカル以外で動かす場合はtrueにする
      sameSite: 'none',
      path: '/',
    });
  }
}
