import { Inject, Injectable } from '@nestjs/common';
import { constantTokens } from 'src/constants';
import { ParticipantAuth } from 'src/domain/entity/auth/participant-auth';
import { IParticipantAuthRepository } from 'src/domain/entity/auth/participant-auth-repository';
import { Password } from 'src/domain/entity/auth/password';
import { Role } from 'src/domain/entity/auth/role';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { ApplicationException } from '../shared/application-exception';

type Param = {
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;
  readonly password: string;
};
type ReadonlyParam = Readonly<Param>;

@Injectable()
export class CreateParticipantUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(constantTokens.PARTICIPANT_REPOSITORY)
    private readonly participantRepository: IParticipantRepository,
    @Inject(constantTokens.PARTICIPANT_AUTH_REPOSITORY)
    private readonly participantAuthRepository: IParticipantAuthRepository,
  ) {}

  async do(param: ReadonlyParam) {
    const mailAddress = MailAddress.create({
      mailAddress: param.mailAddress,
    });

    const isExist = await this.participantRepository.getWithMailAddress(
      mailAddress,
    );
    if (isExist)
      throw new ApplicationException(
        '参加者のメールアドレスがすでに存在します',
      );

    const participantId = UniqueID.create();

    // 認証情報
    // TODO: メールアドレスはParticipantAuthに寄せたい
    const password = Password.create({
      password: param.password,
    });
    const participantAuthInfo = ParticipantAuth.create({
      id: participantId,
      values: {
        password,
        roles: [Role.create()],
      },
    });

    // 参加者情報
    const participantName = ParticipantName.create({
      lastName: param.lastName,
      firstName: param.firstName,
    });
    const participant = Participant.create({
      id: participantId,
      name: participantName,
      mailAddress: mailAddress,
    });

    // MEMO: リポジトリを跨いだトランザクションの実装例
    // TODO: このやり方ではロールバックされないので新しく独自のRepositoryを作成する必要がある
    await this.prisma.$transaction(async (prisma) => {
      await this.participantRepository.create(participant);
      await this.participantAuthRepository.create(participantAuthInfo);
    });

    const createdParticipant =
      await this.participantRepository.getWithParticipantId(participant.id);
    if (!createdParticipant)
      throw new ApplicationException('参加者の登録に失敗しました');

    const createdParticipantDto = new CreateParticipantDto(
      createdParticipant.id.id,
      createdParticipant.name.lastName,
      createdParticipant.name.firstName,
      createdParticipant.mailAddress.mailAddress,
      createdParticipant.enrollmentStatus.value,
    );

    return createdParticipantDto;
  }
}

class CreateParticipantDto {
  constructor(
    private readonly _id: string,
    private readonly _lastName: string,
    private readonly _firstName: string,
    private readonly _mailAddress: string,
    private readonly _enrollmentStatus: number,
  ) {}

  get id() {
    return this._id;
  }

  get lastName() {
    return this._lastName;
  }

  get firstName() {
    return this._firstName;
  }

  get mailAddress() {
    return this._mailAddress;
  }

  get enrollmentStatus() {
    return this._enrollmentStatus;
  }
}
