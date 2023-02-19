import { min } from 'class-validator';
import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { alertMailWithMergeablePairNotExist } from 'src/infrastructure/mail/alertMailWithMergeablePairNotExist';
import { ApplicationException } from '../../shared/application-exception';

type Param = {
  readonly participantId: string;
};
type ReadonlyParam = Readonly<Param>;

export class UpdatePairRemoveParticipantUseCase {
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly participantRepository: IParticipantRepository,
  ) {}

  async do(_teamId: string, param: ReadonlyParam) {
    const teamId = UniqueID.reconstruct(_teamId);
    const participantId = UniqueID.reconstruct(param.participantId);

    const team = await this.teamRepository.getWithId(teamId);
    if (!team) throw new ApplicationException('チームが存在しません');

    const checkParticipantStatus = async (participantId: UniqueID) => {
      const participant = await this.participantRepository.getWithId(
        participantId,
      );
      if (!participant) throw new ApplicationException('参加者が存在しません');
      participant.canBeAssignedPairOrTeam();
    };
    await checkParticipantStatus(participantId);

    const pair = team.getPairWithParticipantId(participantId);
    const removedParticipantPair = pair.removeMember(participantId);

    // ペアに参加者が1人しかいない場合は、該当ペアを解散して、残った参加者を同一チームで最も参加者数が少ないペアに合流させる
    if (removedParticipantPair.participantIds.length === 1) {
      const removedPairTeam = team.removePair(pair.id);

      const minPair = removedPairTeam.pairs.reduce((prev, current) => {
        return prev.participantIds.length < current.participantIds.length
          ? prev
          : current;
      });

      if (minPair.participantIds.length === Pair.MAX_PARTICIPANT_COUNT) {
        alertMailWithMergeablePairNotExist({
          teamName: removedPairTeam.name.teamName,
          decreasedParticipantId: participantId.id,
          currentParticipantId: removedParticipantPair.participantIds[0].id,
        });
      }

      const mergedPair = minPair.addMember(
        removedParticipantPair.participantIds[0],
      );
      const mergedPairTeam = removedPairTeam.addPair(mergedPair);
      const upsertedTeam = await this.teamRepository.upsert(mergedPairTeam);

      const upsertedTeamDto = new UpsertedTeamDto(
        upsertedTeam.id.id,
        upsertedTeam.name.teamName,
        upsertedTeam.participantIds.map((id) => id.id),
        upsertedTeam.pairs.map((pair) => pair.id.id),
      );

      return upsertedTeamDto;
    } else {
      const updatedPairTeam = team.updatePair(removedParticipantPair);
      const upsertedTeam = await this.teamRepository.upsert(updatedPairTeam);

      const upsertedTeamDto = new UpsertedTeamDto(
        upsertedTeam.id.id,
        upsertedTeam.name.teamName,
        upsertedTeam.participantIds.map((id) => id.id),
        upsertedTeam.pairs.map((pair) => pair.id.id),
      );

      return upsertedTeamDto;
    }
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
