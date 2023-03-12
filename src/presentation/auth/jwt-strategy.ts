import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { constantTokens } from '../../constants';
import { ParticipantAuthHashed } from '../../domain/entity/auth/participant-auth-hashed';
import { IParticipantAuthRepository } from '../../domain/entity/auth/participant-auth-repository';
import { MailAddress } from '../../domain/entity/participant/mail-address';
import { IParticipantRepository } from '../../domain/entity/participant/participant-repository';
import { UniqueID } from '../../domain/shared/uniqueId';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(constantTokens.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
    @Inject(constantTokens.PARTICIPANT_AUTH_REPOSITORY)
    private readonly participantAuthRepository: IParticipantAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { id: string }): Promise<ParticipantAuthHashed> {
    const participant = await this.participantRepository.getWithParticipantId(
      UniqueID.reconstruct(payload.id),
    );
    if (!participant)
      throw new UnauthorizedException(`id: ${payload.id} is not found.`);

    const participantAuthHashed =
      await this.participantAuthRepository.getWithMailAddress(
        MailAddress.reconstruct({
          mailAddress: participant.mailAddress.mailAddress,
        }),
      );
    if (!participantAuthHashed)
      throw new UnauthorizedException(`id: ${payload.id} is not found.`);

    return participantAuthHashed;
  }
}
