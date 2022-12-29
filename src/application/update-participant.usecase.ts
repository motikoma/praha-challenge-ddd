import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly enrollmentStatus: string;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateParticipantUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do(id: string, param: ReadonlyParam) {
    const participantID = UniqueID.reconstruct(id);
    const participant = await this.repository.getWithId(participantID);
    if (!participant) throw new DomainException('参加者のidが存在しません');

    const enrollmentStatus = EnrollmentStatus.reconstruct({
      value: param.enrollmentStatus,
    });

    const updateParticipant =
      participant.changeEnrollmentStatus(enrollmentStatus);

    const updatedParticipant = await this.repository.update(updateParticipant);

    const updatedParticipantDto = new UpdateParticipantDto(
      updatedParticipant.id.id,
      updatedParticipant.name.lastName,
      updatedParticipant.name.firstName,
      updatedParticipant.mailAddress.mailAddress,
      updatedParticipant.enrollmentStatus.value,
    );

    return updatedParticipantDto;
  }
}

class UpdateParticipantDto {
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
