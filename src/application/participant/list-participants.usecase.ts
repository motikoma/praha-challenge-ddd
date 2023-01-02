import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';

export class ListParticipantsUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do() {
    const participants = await this.repository.list();

    const participantDtos = participants.map((participant) => {
      return new ParticipantDto(
        participant.id.id,
        participant.name.lastName,
        participant.name.firstName,
        participant.mailAddress.mailAddress,
        participant.enrollmentStatus.value,
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
