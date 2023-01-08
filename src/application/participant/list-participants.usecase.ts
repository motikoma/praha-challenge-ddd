import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import {
  IListParticipantsQueryService,
  PagingCondition,
} from './query-service/list-participants-query-service';

type Param = {
  taskIds: string[];
  taskStatus?: number;
  pagingCondition: PagingCondition;
};

export class ListParticipantsUseCase {
  constructor(private readonly queryService: IListParticipantsQueryService) {}

  async do(param: Param) {
    const participants = await this.queryService.list(param);

    const participantDtos = participants.items.map((participant) => {
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
