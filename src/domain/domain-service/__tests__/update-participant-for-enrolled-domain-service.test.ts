import { UpdatePairRemoveParticipantUseCase } from 'src/application/team/pair/update-pair-remove-participant';
import { RemoveParticipantUseCase } from 'src/application/team/participant/remove-participant-usecase';
import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Team } from 'src/domain/entity/team/team';
import { TeamName } from 'src/domain/entity/team/team-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { CheckAssignedPairService } from 'src/infrastructure/db/domain-service/check-assigned-pair-service-impl';
import { CheckAssignedTeamService } from 'src/infrastructure/db/domain-service/check-assigned-team-service-impl';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';
import { TeamRepository } from 'src/infrastructure/db/repository/team-repository-impl';
import { PrismaService } from 'src/prisma.service';
import { UpdateParticipantForEnrolledDomainService } from '../update-participant-for-enrolled-domain-service';

describe('update', () => {
  it('正常系_退会済の参加者のステータスを更新する際に正しい値がRepositoryの引数に渡る', async () => {
    const prismaService = new PrismaService();

    const participantId = UniqueID.reconstruct('1');
    const participantSeceder = participantCreator(ENROLLMENT_STATUS.SECEDER);
    const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

    const pair = Pair.reconstruct({
      id: UniqueID.reconstruct('1'),
      values: {
        name: PairName.create({ pairName: 'a' }),
        participantIds: [
          UniqueID.reconstruct('1'),
          UniqueID.reconstruct('2'),
          UniqueID.reconstruct('3'),
        ],
      },
    });

    const team = Team.reconstruct({
      id: UniqueID.reconstruct('1'),
      values: {
        name: TeamName.create({ teamName: 1 }),
        participantIds: [
          UniqueID.reconstruct('1'),
          UniqueID.reconstruct('2'),
          UniqueID.reconstruct('3'),
          UniqueID.reconstruct('4'),
        ],
        pairs: [pair],
      },
    });

    const teamRepository = new TeamRepository(prismaService);
    jest.spyOn(teamRepository, 'getWithParticipantId').mockResolvedValue(team);

    const participantRepository = new ParticipantRepository(prismaService);
    jest
      .spyOn(participantRepository, 'getWithParticipantId')
      .mockResolvedValue(participantSeceder);
    jest
      .spyOn(participantRepository, 'update')
      .mockResolvedValue(participantEnrolled);

    const checkAssignedTeamService = new CheckAssignedTeamService(
      prismaService,
    );
    jest
      .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
      .mockResolvedValue(null);

    const checkAssignedPairService = new CheckAssignedPairService(
      prismaService,
    );
    jest
      .spyOn(checkAssignedPairService, 'checkAssignedPair')
      .mockResolvedValue(null);

    jest.mock(
      'src/application/team/pair/update-pair-remove-participant',
      () => {
        return jest.fn().mockImplementation(() => {
          return {
            teamRepository: jest.fn(),
            participantRepository: jest.fn(),
            do: jest.fn(),
          };
        });
      },
    );
    const UpdatePairRemoveParticipantUseCase = require('src/application/team/pair/update-pair-remove-participant');
    const updatePairRemoveParticipantUseCase =
      new UpdatePairRemoveParticipantUseCase();

    jest.mock(
      'src/application/team/participant/remove-participant-usecase',
      () => {
        return jest.fn().mockImplementation(() => {
          return {
            teamRepository: jest.fn(),
            participantRepository: jest.fn(),
            do: jest.fn(),
          };
        });
      },
    );
    const RemoveParticipantUsecase = require('src/application/team/participant/remove-participant-usecase');
    const removeParticipantUsecase = new RemoveParticipantUsecase();

    const updateParticipantDomainService =
      new UpdateParticipantForEnrolledDomainService(
        updatePairRemoveParticipantUseCase,
        removeParticipantUsecase,
        participantRepository,
        teamRepository,
        checkAssignedTeamService,
        checkAssignedPairService,
      );

    await updateParticipantDomainService.do(participantId, {
      enrollmentStatus: ENROLLMENT_STATUS.ENROLLED,
    });

    expect(participantRepository.getWithParticipantId).toHaveBeenCalledWith(
      UniqueID.reconstruct('1'),
    );

    expect(participantRepository.update).toHaveBeenCalledWith(
      participantEnrolled,
    );
  });

  describe('参加者のステータスがENROLLEDの場合', () => {
    it('準正常系_チームが割り当てられている場合、在籍中から別のステータスに変更できません', async () => {
      const prismaService = new PrismaService();

      const participantId = UniqueID.reconstruct('1');
      const participantEnrolled = participantCreator(
        ENROLLMENT_STATUS.ENROLLED,
      );

      const teamRepository = new TeamRepository(prismaService);
      const participantRepository = new ParticipantRepository(prismaService);
      const updatePairRemoveParticipantUseCase =
        new UpdatePairRemoveParticipantUseCase(
          teamRepository,
          participantRepository,
        );
      const removeParticipantUsecase = new RemoveParticipantUseCase(
        teamRepository,
        participantRepository,
      );

      jest
        .spyOn(participantRepository, 'getWithParticipantId')
        .mockResolvedValue(participantEnrolled);

      const checkAssignedTeamService = new CheckAssignedTeamService(
        prismaService,
      );
      jest
        .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
        .mockResolvedValue(true);

      const checkAssignedPairService = new CheckAssignedPairService(
        prismaService,
      );
      jest
        .spyOn(checkAssignedPairService, 'checkAssignedPair')
        .mockResolvedValue(null);

      const updateParticipantDomainService =
        new UpdateParticipantForEnrolledDomainService(
          updatePairRemoveParticipantUseCase,
          removeParticipantUsecase,
          participantRepository,
          teamRepository,
          checkAssignedTeamService,
          checkAssignedPairService,
        );

      await expect(
        updateParticipantDomainService.do(participantId, {
          enrollmentStatus: ENROLLMENT_STATUS.SECEDER,
        }),
      ).rejects.toThrowError(
        'チームが割り当てられているので、在籍中から別のステータスに変更できません',
      );
    });

    it('準正常系_ペアが割り当てられている場合、在籍中から別のステータスに変更できません', async () => {
      const prismaService = new PrismaService();

      const participantId = UniqueID.reconstruct('1');
      const participantEnrolled = participantCreator(
        ENROLLMENT_STATUS.ENROLLED,
      );

      const teamRepository = new TeamRepository(prismaService);
      const participantRepository = new ParticipantRepository(prismaService);
      const updatePairRemoveParticipantUseCase =
        new UpdatePairRemoveParticipantUseCase(
          teamRepository,
          participantRepository,
        );
      const removeParticipantUsecase = new RemoveParticipantUseCase(
        teamRepository,
        participantRepository,
      );

      jest
        .spyOn(participantRepository, 'getWithParticipantId')
        .mockResolvedValue(participantEnrolled);

      const checkAssignedTeamService = new CheckAssignedTeamService(
        prismaService,
      );
      jest
        .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
        .mockResolvedValue(null);

      const checkAssignedPairService = new CheckAssignedPairService(
        prismaService,
      );
      jest
        .spyOn(checkAssignedPairService, 'checkAssignedPair')
        .mockResolvedValue(true);

      const updateParticipantDomainService =
        new UpdateParticipantForEnrolledDomainService(
          updatePairRemoveParticipantUseCase,
          removeParticipantUsecase,
          participantRepository,
          teamRepository,
          checkAssignedTeamService,
          checkAssignedPairService,
        );

      await expect(
        updateParticipantDomainService.do(participantId, {
          enrollmentStatus: ENROLLMENT_STATUS.SECEDER,
        }),
      ).rejects.toThrowError(
        'ペアが割り当てられているので、在籍中から別のステータスに変更できません',
      );
    });
  });

  it('準正常系_参加者のidが存在しない場合はエラーになる', async () => {
    const prismaService = new PrismaService();

    const participantId = UniqueID.reconstruct('1');
    const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

    const teamRepository = new TeamRepository(prismaService);
    const participantRepository = new ParticipantRepository(prismaService);
    const updatePairRemoveParticipantUseCase =
      new UpdatePairRemoveParticipantUseCase(
        teamRepository,
        participantRepository,
      );
    const removeParticipantUsecase = new RemoveParticipantUseCase(
      teamRepository,
      participantRepository,
    );

    jest
      .spyOn(participantRepository, 'getWithParticipantId')
      .mockResolvedValue(null);

    jest
      .spyOn(participantRepository, 'update')
      .mockResolvedValue(participantEnrolled);

    const checkAssignedTeamService = new CheckAssignedTeamService(
      prismaService,
    );
    jest
      .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
      .mockResolvedValue(null);

    const checkAssignedPairService = new CheckAssignedPairService(
      prismaService,
    );
    jest
      .spyOn(checkAssignedPairService, 'checkAssignedPair')
      .mockResolvedValue(null);

    const updateParticipantDomainService =
      new UpdateParticipantForEnrolledDomainService(
        updatePairRemoveParticipantUseCase,
        removeParticipantUsecase,
        participantRepository,
        teamRepository,
        checkAssignedTeamService,
        checkAssignedPairService,
      );

    await expect(
      updateParticipantDomainService.do(participantId, {
        enrollmentStatus: ENROLLMENT_STATUS.ENROLLED,
      }),
    ).rejects.toThrowError('参加者のidが存在しません');
  });
});

const participantCreator = (status: number) => {
  return Participant.reconstruct({
    id: UniqueID.reconstruct('1'),
    values: {
      name: ParticipantName.create({ lastName: '山田', firstName: '太郎' }),
      mailAddress: MailAddress.create({ mailAddress: 'hoge@gmail.com' }),
      enrollmentStatus: EnrollmentStatus.reconstruct({
        value: status,
      }),
    },
  });
};
