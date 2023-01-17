import { ICheckAssignedPairService } from 'src/domain/domain-service/check-assined-pair-service';
import { ICheckAssignedTeamService } from 'src/domain/domain-service/check-assined-team-service';
import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from 'src/domain/entity/participant/enrollment-status';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ApplicationException } from '../shared/application-exception';

type Param = {
  readonly enrollmentStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateParticipantUseCase {
  constructor(
    private readonly repository: IParticipantRepository,
    private readonly checkAssignedPairService: ICheckAssignedPairService,
    private readonly checkAssignedTeamService: ICheckAssignedTeamService,
  ) {}

  async do(id: string, param: ReadonlyParam) {
    const participantId = UniqueID.reconstruct(id);
    const participant = await this.repository.getWithId(participantId);

    if (!participant)
      throw new ApplicationException('参加者のidが存在しません');

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

    const updatedParticipantDto = new UpdateParticipantDto(
      updatedParticipant.id.id,
      updatedParticipant.name.lastName,
      updatedParticipant.name.firstName,
      updatedParticipant.mailAddress.mailAddress,
      updatedParticipant.enrollmentStatus.value,
    );

    return updatedParticipantDto;
  }
}

class UpdateParticipantDto {
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
