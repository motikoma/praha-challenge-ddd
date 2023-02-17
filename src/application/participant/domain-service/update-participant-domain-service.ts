import { ApplicationException } from 'src/application/shared/application-exception';
import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from '../../../domain/entity/participant/enrollment-status';
import { Participant } from '../../../domain/entity/participant/participant';
import { IParticipantRepository } from '../../../domain/entity/participant/participant-repository';
import { UniqueID } from '../../../domain/shared/uniqueId';

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

export class UpdateParticipantDomainService {
  constructor(
    private readonly repository: IParticipantRepository,
    private readonly checkAssignedTeamService: ICheckAssignedTeamService,
    private readonly checkAssignedPairService: ICheckAssignedPairService,
  ) {
    this.repository = repository;
    this.checkAssignedTeamService = checkAssignedTeamService;
    this.checkAssignedPairService = checkAssignedPairService;
  }

  async update(
    participantId: UniqueID,
    param: ReadonlyParam,
  ): Promise<Participant> {
    const participant = await this.repository.getWithId(participantId);

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

    const enrollmentStatus = EnrollmentStatus.reconstruct({
      value: param.enrollmentStatus,
    });
    const updateParticipant =
      participant.changeEnrollmentStatus(enrollmentStatus);
    const updatedParticipant = await this.repository.update(updateParticipant);

    return updatedParticipant;
  }
}
