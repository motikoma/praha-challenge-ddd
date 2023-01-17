import { Filter } from 'src/application/participant/query-service/list-participants-query-service';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Page } from 'src/domain/shared/page';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { CheckAssignedPairService } from '../check-assined-pair-service-impl';

describe('list-participant-query-service-impl', () => {
  const prisma = new PrismaService();
  const checkAssignedPairService = new CheckAssignedPairService(prisma);

  beforeEach(async () => {
    await prisma.participantOnPair.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('[正常系]参加者がペアに所属している場合はtrue', () => {
    it('[正常系]課題idが空配列の場合は全参加者数が返る', async () => {
      /**
       * 参加者データ作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 参加者とペアの紐付けデータ作成
       */
      const participantOnPairNumber = 10;

      // TODO: リポジトリの実装を完了してから
    });
  });

  /**
   * 参加者テストデータ作成メソッド
   */
  const createParticipantData = async (participantsNumber: number) => {
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
});
