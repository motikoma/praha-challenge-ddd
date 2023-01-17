import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../shared/application-exception';

export class GetTeamUseCase {
  constructor(private readonly repository: ITeamRepository) {}

  async do(teamId: string): Promise<TeamDto> {
    const team = await this.repository.getWithId(UniqueID.reconstruct(teamId));
    if (!team) throw new ApplicationException('チームが存在しません');

    const teamDto = new TeamDto(
      team.id.id,
      team.name.teamName,
      team.participantIds.map((id) => id.id),
      team.pairs.map((pair) => pair.id.id),
    );

    return teamDto;
  }
}

class TeamDto {
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
