import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../../shared/application-exception';

type Param = {
  readonly pairId: string;
};
type ReadonlyParam = Readonly<Param>;

export class RemovePairUseCase {
  constructor(private readonly repository: ITeamRepository) {}

  async do(id: string, param: ReadonlyParam) {
    const teamId = UniqueID.reconstruct(id);
    const pairId = UniqueID.reconstruct(param.pairId);
    const team = await this.repository.getWithTeamId(teamId);
    if (!team) throw new ApplicationException('チームが存在しません');

    const teamWithChangePair = team.removePair(pairId);

    const upsertedTeam = await this.repository.upsert(teamWithChangePair);

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
