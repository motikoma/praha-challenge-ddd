import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ParticipantRepository } from '../../repository/participant-repository-impl';

/**
 * 参加者テストデータ作成
 *
 * @param participantRepository 参加者リポジトリ
 * @param participantsNumber 参加者数
 */

type Props = {
  participantRepository: ParticipantRepository;
  participantsNumber: number;
};

type ReadonlyProps = Readonly<Props>;

export const createParticipantData = async (props: ReadonlyProps) => {
  const { participantRepository, participantsNumber } = props;

  for (let i = 0; i < participantsNumber; i++) {
    const participantId = UniqueID.reconstruct(
      `4130b8c4-ca82-48bf-92e1-3f32c618ee-${i}`,
    );
    const name = ParticipantName.create({
      lastName: `sakamoto_${i}`,
      firstName: `keisuke_${i}`,
    });
    const mailAddress = MailAddress.create({
      mailAddress: `hoge_${i}@gmail.com`,
    });
    const enrollmentStatus = EnrollmentStatus.create();

    const participant = Participant.reconstruct({
      id: participantId,
      values: {
        name,
        mailAddress,
        enrollmentStatus,
      },
    });

    await participantRepository.create(participant);
  }
};
