import { UpdateParticipantDomainService } from 'src/application/participant/domain-service/update-participant-domain-service';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly enrollmentStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateParticipantUseCase {
  constructor(
    private readonly updateParticipantDomainService: UpdateParticipantDomainService,
  ) {}

  async do(id: string, param: ReadonlyParam) {
    const participantId = UniqueID.reconstruct(id);
    const updatedParticipant = await this.updateParticipantDomainService.update(
      participantId,
      param,
    );

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
