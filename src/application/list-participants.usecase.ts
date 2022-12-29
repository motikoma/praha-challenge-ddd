import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';

export class ListParticipantsUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do() {
    const participants = await this.repository.list();

    const participantDtos = participants.map((listedParticipant) => {
      return new ParticipantDto(
        listedParticipant.id.id,
        listedParticipant.name.lastName,
        listedParticipant.name.firstName,
        listedParticipant.mailAddress.mailAddress,
        listedParticipant.enrollmentStatus.value,
      );
    });

    return participantDtos;
  }
}

class ParticipantDto {
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
