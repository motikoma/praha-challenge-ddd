import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { DomainException } from 'src/domain/shared/domain-exception';

type Param = {
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;
};
type ReadonlyParam = Readonly<Param>;

export class CreateParticipantUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do(param: ReadonlyParam) {
    const mailAddress = MailAddress.create({
      mailAddress: param.mailAddress,
    });

    const isExist = await this.repository.getWithMailAddress(mailAddress);
    if (isExist)
      throw new DomainException('参加者のメールアドレスがすでに存在します');

    const participantName = ParticipantName.create({
      lastName: param.lastName,
      firstName: param.firstName,
    });

    const participant = Participant.create({
      name: participantName,
      mailAddress: mailAddress,
    });

    const createdParticipant = await this.repository.create(participant);

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
    private readonly _enrollmentStatus: string,
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
