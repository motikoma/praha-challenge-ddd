import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../../shared/application-exception';

type Param = {
  readonly participantId: string;
};
type ReadonlyParam = Readonly<Param>;

export class AssignParticipantUseCase {
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly participantRepository: IParticipantRepository,
  ) {}

  async do(_teamId: string, param: ReadonlyParam) {
    const teamId = UniqueID.reconstruct(_teamId);
    const participantId = UniqueID.reconstruct(param.participantId);

    const team = await this.teamRepository.getWithId(teamId);
    if (!team) throw new ApplicationException('チームが存在しません');

    // 参加者の状態をチェックする
    const result = await this.participantRepository.getWithId(participantId);
    if (!result) throw new ApplicationException('参加者が存在しません');
    result.canBeAssignedPairOrTeam();

    const teamWithChangeMember = team.addMember(participantId);

    const upsertedTeam = await this.teamRepository.upsert(teamWithChangeMember);

    const upsertedTeamDto = new UpsertedTeamDto(
      upsertedTeam.id.id,
      upsertedTeam.name.teamName,
      upsertedTeam.participantIds.map((id) => id.id),
      upsertedTeam.pairs.map((pair) => pair.id.id),
    );

    return upsertedTeamDto;
  }
}

class UpsertedTeamDto {
  constructor(
    private readonly _id: string,
    private readonly _teamName: number,
    private readonly _participantIds: string[],
    private readonly _pairIds: string[],
  ) {}

  get id() {
    return this._id;
  }

  get teamName() {
    return this._teamName;
  }

  get participantIds() {
    return this._participantIds;
  }

  get pairIds() {
    return this._pairIds;
  }
}
