import { Prisma } from '@prisma/client';
import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Team } from 'src/domain/entity/team/team';
import { TeamName } from 'src/domain/entity/team/team-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { ParticipantRepository } from '../../repository/participant-repository-impl';
import { TeamRepository } from '../../repository/team-repository-impl';

describe('check-assigned-pair-service-impl', () => {
  const prisma = new PrismaService();
  const participantRepository = new ParticipantRepository(prisma);
  const teamRepository = new TeamRepository(prisma);

  beforeEach(async () => {
    await prisma.participantOnPair.deleteMany();
    await prisma.participantOnTeam.deleteMany();
    await prisma.teamOnPair.deleteMany();
    await prisma.team.deleteMany();
    await prisma.pair.deleteMany();
    await prisma.participantOnEnrollmentStatus.deleteMany();
    await prisma.participantMailAddress.deleteMany();
    await prisma.participantOnTask.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('[正常系]参加者がペアに所属している場合はtrue', () => {
    it('[正常系]', async () => {
      /**
       * 参加者データ作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * チームデータ作成
       */
      await createTeamData();

      /**
       * ペアデータ作成
       */
      await createPairData();

      /**
       * 参加者とペアの紐付けデータ作成
       */
      const pair = Pair.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name: PairName.create({ pairName: 'a' }),
          participantIds: [
            UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-1'),
            UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-2'),
          ],
        },
      });

      const team = Team.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-1'),
            UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-2'),
          ],
          pairs: [pair],
        },
      });

      const result = await teamRepository.upsert(team);
      expect(result.id.id).toBe(team.id.id);
      expect(result.name.teamName).toBe(team.name.teamName);
      expect(result.participantIds[0].id).toBe(team.participantIds[0].id);
      expect(result.pairs[0].id.id).toBe(team.pairs[0].id.id);
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

  /**
   * チームデータ作成メソッド
   */
  const createTeamData = async () => {
    const teamData: Prisma.TeamCreateInput[] = [
      {
        id: '1',
        teamName: 1,
      },
      {
        id: '2',
        teamName: 2,
      },
    ];

    for (const d of teamData) {
      const data = await prisma.team.create({
        data: d,
      });
    }
  };

  /**
   * ペアデータ作成メソッド
   */
  const createPairData = async () => {
    const pairData: Prisma.PairCreateInput[] = [
      {
        id: '1',
        pairName: 'a',
      },
      {
        id: '2',
        pairName: 'b',
      },
    ];

    for (const d of pairData) {
      const data = await prisma.pair.create({
        data: d,
      });
    }
  };
});
