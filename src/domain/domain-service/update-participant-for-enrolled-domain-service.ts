import { ApplicationException } from 'src/application/shared/application-exception';
import { UpdatePairRemoveParticipantUseCase } from 'src/application/team/pair/update-pair-remove-participant';
import { RemoveParticipantUseCase } from 'src/application/team/participant/remove-participant-usecase';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import {
  ENROLLMENT_STATUS,
  EnrollmentStatus,
} from '../entity/participant/enrollment-status';
import { Participant } from '../entity/participant/participant';
import { IParticipantRepository } from '../entity/participant/participant-repository';
import { UniqueID } from '../shared/uniqueId';

type Param = {
  readonly enrollmentStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export interface ICheckAssignedTeamService {
  checkAssignedTeam: (participantId: UniqueID) => Promise<boolean | null>;
}

export interface ICheckAssignedPairService {
  checkAssignedPair: (participantId: UniqueID) => Promise<boolean | null>;
}

export class UpdateParticipantForEnrolledDomainService {
  constructor(
    private readonly updatePairRemoveParticipantUseCase: UpdatePairRemoveParticipantUseCase,
    private readonly removeParticipantUseCase: RemoveParticipantUseCase,
    private readonly participantRepository: IParticipantRepository,
    private readonly teamRepository: ITeamRepository,
    private readonly checkAssignedTeamService: ICheckAssignedTeamService,
    private readonly checkAssignedPairService: ICheckAssignedPairService,
  ) {
    this.updatePairRemoveParticipantUseCase =
      updatePairRemoveParticipantUseCase;
    this.removeParticipantUseCase = removeParticipantUseCase;
    this.participantRepository = participantRepository;
    this.teamRepository = teamRepository;
    this.checkAssignedTeamService = checkAssignedTeamService;
    this.checkAssignedPairService = checkAssignedPairService;
  }

  async do(
    participantId: UniqueID,
    param: ReadonlyParam,
  ): Promise<Participant> {
    const participant = await this.participantRepository.getWithParticipantId(
      participantId,
    );
    if (!participant)
      throw new ApplicationException('参加者のidが存在しません');

    // MEMO: 参加者エンティティがペアやチームのインスタンス参照をしていないのでドメインサービスで在籍中の参加者がペアもしくはチームに割り当てられているかどうかを確認する
    if (participant.enrollmentStatus.value === ENROLLMENT_STATUS.ENROLLED) {
      const isAssignedPair =
        await this.checkAssignedPairService.checkAssignedPair(participantId);
      if (isAssignedPair)
        throw new ApplicationException(
          'ペアが割り当てられているので、在籍中から別のステータスに変更できません',
        );
      const isAssignedTeam =
        await this.checkAssignedTeamService.checkAssignedTeam(participantId);
      if (isAssignedTeam)
        throw new ApplicationException(
          'チームが割り当てられているので、在籍中から別のステータスに変更できません',
        );
    }

    await this.updatePairRemoveParticipant(participantId);
    await this.updateTeamRemoveParticipant(participantId);

    const enrollmentStatus = EnrollmentStatus.reconstruct({
      value: param.enrollmentStatus,
    });
    const updateParticipant =
      participant.changeEnrollmentStatus(enrollmentStatus);
    const updatedParticipant = await this.participantRepository.update(
      updateParticipant,
    );

    return updatedParticipant;
  }

  // ステータスを在籍中から休会中または退会済に変更する場合は、ペアの割り当てを解除する
  private updatePairRemoveParticipant = async (participantId: UniqueID) => {
    const team = await this.teamRepository.getWithParticipantId(participantId);
    if (!team)
      throw new ApplicationException(
        `${participantId}が所属するチームが存在しません`,
      );

    const pair = team.pairs.find((pair) => {
      return pair.participantIds.find((participant) => {
        return participant.equals(participantId);
      });
    });
    if (!pair)
      throw new ApplicationException(
        `${participantId}が所属するペアが存在しません`,
      );

    await this.updatePairRemoveParticipantUseCase.do({
      teamId: team.id.id,
      pairId: pair.id.id,
      participantId: participantId.id,
    });
  };

  // ステータスを在籍中から休会中または退会済に変更する場合は、チームの割り当てを解除する
  private updateTeamRemoveParticipant = async (participantId: UniqueID) => {
    const team = await this.teamRepository.getWithParticipantId(participantId);
    if (!team)
      throw new ApplicationException(
        `${participantId}が所属するチームが存在しません`,
      );

    await this.removeParticipantUseCase.do(team.id.id, {
      participantId: participantId.id,
    });
  };
}
