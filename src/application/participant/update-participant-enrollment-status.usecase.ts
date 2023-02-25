import { UpdateParticipantForEnrolledDomainService } from 'src/application/participant/domain-service/update-participant-for-enrolled-domain-service';
import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from 'src/domain/entity/participant/enrollment-status';
import { Participant } from 'src/domain/entity/participant/participant';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly enrollmentStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateParticipantEnrollmentStatusUseCase {
  constructor(
    private readonly participantRepository: IParticipantRepository,
    private readonly updateParticipantForEnrolledDomainService: UpdateParticipantForEnrolledDomainService,
    private readonly teamRepository: ITeamRepository,
  ) {}

  async do(id: string, param: ReadonlyParam) {
    const participantId = UniqueID.reconstruct(id);

    if (param.enrollmentStatus === ENROLLMENT_STATUS.ENROLLED) {
      const updatedParticipant =
        await this.updateParticipantForEnrolledDomainService.do(
          participantId,
          param,
        );

      const updatedParticipantDto = new UpdateParticipantDto(
        updatedParticipant.id.id,
        updatedParticipant.name.lastName,
        updatedParticipant.name.firstName,
        updatedParticipant.mailAddress.mailAddress,
        updatedParticipant.enrollmentStatus.value,
      );

      return updatedParticipantDto;
    } else {
      /**
       * 休会中の参加者が復帰
       */
      const participant = await this.participantRepository.getWithParticipantId(
        participantId,
      );
      if (!participant)
        throw new Error(
          `participantId: ${participantId}に該当する参加者が存在しません`,
        );

      const enrollmentStatus = EnrollmentStatus.reconstruct({
        value: param.enrollmentStatus,
      });

      const newParticipant = Participant.reconstruct({
        id: participantId,
        values: {
          name: participant.name,
          mailAddress: participant.mailAddress,
          enrollmentStatus,
        },
      });

      await this.participantRepository.update(newParticipant);

      /**
       * チームとペアの再割り当て
       */
      // 休会中の参加者が復帰した（在籍ステータス「在籍中」に切り替わった）際に所属するチームとペアは、最も参加人数が少ないチームの中で、最も参加人数が少ないペアから自動的に選ばれる
      const teams = await this.teamRepository.list();
      if ((teams.length = 0)) throw new Error('チームが存在しません');

      // teamsの中で最も参加人数が少ないチームを抽出する
      // 参加人数が同じの場合はランダムに選択する
      const minTeam = teams.reduce((prev, current) => {
        return prev.participantIds.length < current.participantIds.length
          ? prev
          : current;
      });

      // 参加人数が最も少ないチームの中で最も参加人数が少ないペアを抽出する
      const minPair = minTeam.pairs.reduce((prev, current) => {
        return prev.participantIds.length < current.participantIds.length
          ? prev
          : current;
      });

      // MEMO: 実際のサービスでは自動的にペアを割り振るのではなく、管理者がいろいろな事情を考慮して決めるはずなので程々に実装する
      // 参加者が増えることでペアが4名になってしまう場合、自動的に2つのペアに分解する必要がある
      if (minPair.participantIds.length === 3) {
        // 既存ペアから1人を除名して、チームを更新する
        minTeam.removePair(minPair.id);
        const removedParticipantPair = minPair.removeMember(
          minPair.participantIds[0],
        );
        minTeam.addPair(removedParticipantPair);

        // 上記で除名した1人と今回復帰した参加者をペアにする
        const newPair = Pair.create({
          participantIds: [minPair.participantIds[0], participantId],
          name: PairName.create({ pairName: 'z' }), // 便宜上、zとする
        });
        minTeam.addPair(newPair);
        await this.teamRepository.upsert(minTeam);
      } else {
        // ペアに参加者を追加する
        minPair.addMember(participantId);
        await this.teamRepository.upsert(minTeam);
      }

      const updatedParticipantDto = new UpdateParticipantDto(
        newParticipant.id.id,
        newParticipant.name.lastName,
        newParticipant.name.firstName,
        newParticipant.mailAddress.mailAddress,
        newParticipant.enrollmentStatus.value,
      );

      return updatedParticipantDto;
    }
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
