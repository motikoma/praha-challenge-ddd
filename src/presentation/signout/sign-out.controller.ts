import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller({
  path: '/signOut',
})
export class SignOutController {
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Res({ passthrough: true }) res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: false, // ローカル以外で動かす場合はtrueにする
      sameSite: 'none',
      path: '/',
    });
  }
}
