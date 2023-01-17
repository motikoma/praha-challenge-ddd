import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../shared/application-exception';

type Param = {
  readonly pairName: string;
  readonly pairIds: string[];
};
type ReadonlyParam = Readonly<Param>;

export class AssignPairUseCase {
  constructor(private readonly repository: ITeamRepository) {}

  async do(id: string, param: ReadonlyParam) {
    const teamId = UniqueID.reconstruct(id);
    const pairName = PairName.create({ pairName: param.pairName });
    const pairIds = param.pairIds.map((id) => UniqueID.reconstruct(id));

    const team = await this.repository.getWithId(teamId);
    if (!team) throw new ApplicationException('チームが存在しません');

    const newPair = Pair.create({
      name: pairName,
      participantIds: pairIds,
    });
    team.addPair(newPair);

    const upsertedTeam = await this.repository.upsert(team);

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
