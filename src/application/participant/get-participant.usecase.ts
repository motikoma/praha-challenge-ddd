import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../shared/application-exception';

export class GetParticipantUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  async do(participantId: string) {
    const participantIdVo = UniqueID.reconstruct(participantId);
    const participant = await this.participantRepository.getWithParticipantId(
      participantIdVo,
    );
    if (!participant) {
      throw new ApplicationException('参加者のidが存在しません');
    }

    const participantDto = new ParticipantDto(
      participant.id.id,
      participant.name.lastName,
      participant.name.firstName,
      participant.mailAddress.mailAddress,
      participant.enrollmentStatus.value,
    );

    return participantDto;
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
