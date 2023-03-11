import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import { Team } from 'src/domain/entity/team/team';
import { TeamName } from 'src/domain/entity/team/team-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { createParticipantData } from '../../shared/testDataFactory/create-participant-data';
import { ParticipantRepository } from '../participant-repository-impl';
import { TeamRepository } from '../team-repository-impl';

// TODO
describe('TeamRepository', () => {
  const prisma = new PrismaService();
  const teamRepository = new TeamRepository(prisma);
  const participantRepository = new ParticipantRepository(prisma);

  beforeEach(async () => {
    await prisma.participantOnPair.deleteMany();
    await prisma.participantOnTeam.deleteMany();
    await prisma.teamOnPair.deleteMany();
    await prisma.participantOnEnrollmentStatus.deleteMany();
    await prisma.participantMailAddress.deleteMany();
    await prisma.participantOnTask.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('[正常系]getWithTeamId: チームIDからチームを取得できる', async () => {
    /**
     * 参加者データ作成
     */
    const participantsNumber = 30;
    await createParticipantData({ participantRepository, participantsNumber });

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

    /**
     * チームとペアの紐付けデータ作成
     */
    const team = Team.reconstruct({
      id: UniqueID.reconstruct('1'),
      values: {
        name: TeamName.reconstruct({ teamName: 1 }),
        participantIds: [
          UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-1'),
          UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee-2'),
        ],
        pairs: [pair],
      },
    });

    await teamRepository.upsert(team);

    const actual = await teamRepository.getWithTeamId(team.id);
    expect(actual).toEqual(team);
  });
});
