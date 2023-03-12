import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IParticipantAuthRepository } from 'src/domain/entity/auth/participant-auth-repository';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';

import * as bcrypt from 'bcrypt';
import { constantTokens } from 'src/constants';
import { ApplicationException } from '../shared/application-exception';

type Param = {
  readonly mailAddress: string;
  readonly password: string;
};

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(constantTokens.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
    @Inject(constantTokens.PARTICIPANT_AUTH_REPOSITORY)
    private readonly participantAuthRepository: IParticipantAuthRepository,
  ) {}

  async do(param: Param) {
    const { mailAddress, password } = param;

    const participantAuth =
      await this.participantAuthRepository.getWithMailAddress(
        MailAddress.reconstruct({ mailAddress }),
      );
    if (!participantAuth)
      throw new ApplicationException(
        'メールアドレスとパスワードを確認してください',
      );

    const participant = await this.participantRepository.getWithMailAddress(
      MailAddress.reconstruct({ mailAddress }),
    );
    if (!participant)
      throw new ApplicationException(
        'メールアドレスとパスワードを確認してください',
      );

    const isPassewordMatch = await bcrypt.compare(
      password,
      participantAuth.values.passwordHashed,
    );

    if (isPassewordMatch) {
      const payload = {
        id: participant.id.id,
        roles: participantAuth.values.roles.map((role) => role.role),
      };
      const accessToken = await this.jwtService.sign(payload);
      return new SignInDto(accessToken);
    }
    throw new ApplicationException(
      'メールアドレスとパスワードを確認してください',
    );
  }
}

class SignInDto {
  constructor(private readonly _accessToken: string) {}

  get accessToken() {
    return this._accessToken;
  }
}
