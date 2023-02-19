import { PrismaClient } from '@prisma/client';
import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { CheckAssignedPairService } from 'src/infrastructure/db/domain-service/check-assigned-pair-service-impl';
import { CheckAssignedTeamService } from 'src/infrastructure/db/domain-service/check-assigned-team-service-impl';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';
import { UpdateParticipantDomainService } from '../update-participant-domain-service';

describe('update', () => {
  it('正常系_退会済の参加者のステータスを更新する際に正しい値がRepositoryの引数に渡る', async () => {
    const prismaClient = new PrismaClient();

    const participantId = UniqueID.reconstruct('1');
    const participantSeceder = participantCreator(ENROLLMENT_STATUS.SECEDER);
    const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

    const participantRepository = new ParticipantRepository(prismaClient);
    jest
      .spyOn(participantRepository, 'getWithId')
      .mockResolvedValue(participantSeceder);
    jest
      .spyOn(participantRepository, 'update')
      .mockResolvedValue(participantEnrolled);

    const checkAssignedTeamService = new CheckAssignedTeamService(prismaClient);
    jest
      .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
      .mockResolvedValue(null);

    const checkAssignedPairService = new CheckAssignedPairService(prismaClient);
    jest
      .spyOn(checkAssignedPairService, 'checkAssignedPair')
      .mockResolvedValue(null);

    const updateParticipantDomainService = new UpdateParticipantDomainService(
      participantRepository,
      checkAssignedTeamService,
      checkAssignedPairService,
    );

    await updateParticipantDomainService.do(participantId, {
      enrollmentStatus: ENROLLMENT_STATUS.ENROLLED,
    });

    expect(participantRepository.getWithId).toHaveBeenCalledWith(
      UniqueID.reconstruct('1'),
    );

    expect(participantRepository.update).toHaveBeenCalledWith(
      participantEnrolled,
    );
  });
});

it('準正常系_参加者のidが存在しない場合はエラーになる', async () => {
  const prismaClient = new PrismaClient();

  const participantId = UniqueID.reconstruct('1');
  const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

  const participantRepository = new ParticipantRepository(prismaClient);
  jest.spyOn(participantRepository, 'getWithId').mockResolvedValue(null);

  jest
    .spyOn(participantRepository, 'update')
    .mockResolvedValue(participantEnrolled);

  const checkAssignedTeamService = new CheckAssignedTeamService(prismaClient);
  jest
    .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
    .mockResolvedValue(null);

  const checkAssignedPairService = new CheckAssignedPairService(prismaClient);
  jest
    .spyOn(checkAssignedPairService, 'checkAssignedPair')
    .mockResolvedValue(null);

  const updateParticipantDomainService = new UpdateParticipantDomainService(
    participantRepository,
    checkAssignedTeamService,
    checkAssignedPairService,
  );

  await expect(
    updateParticipantDomainService.do(participantId, {
      enrollmentStatus: ENROLLMENT_STATUS.ENROLLED,
    }),
  ).rejects.toThrowError('参加者のidが存在しません');
});

// TODO
// ステータスがENROLLEDの場合
// ペアが割り当てられているので、在籍中から別のステータスに変更できません
// チームが割り当てられているので、在籍中から別のステータスに変更できません

describe('参加者のステータスがENROLLEDの場合', () => {
  it('準正常系_チームが割り当てられている場合、在籍中から別のステータスに変更できません', async () => {
    const prismaClient = new PrismaClient();

    const participantId = UniqueID.reconstruct('1');
    const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

    const participantRepository = new ParticipantRepository(prismaClient);
    jest
      .spyOn(participantRepository, 'getWithId')
      .mockResolvedValue(participantEnrolled);

    const checkAssignedTeamService = new CheckAssignedTeamService(prismaClient);
    jest
      .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
      .mockResolvedValue(true);

    const checkAssignedPairService = new CheckAssignedPairService(prismaClient);
    jest
      .spyOn(checkAssignedPairService, 'checkAssignedPair')
      .mockResolvedValue(null);

    const updateParticipantDomainService = new UpdateParticipantDomainService(
      participantRepository,
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
    const prismaClient = new PrismaClient();

    const participantId = UniqueID.reconstruct('1');
    const participantEnrolled = participantCreator(ENROLLMENT_STATUS.ENROLLED);

    const participantRepository = new ParticipantRepository(prismaClient);
    jest
      .spyOn(participantRepository, 'getWithId')
      .mockResolvedValue(participantEnrolled);

    const checkAssignedTeamService = new CheckAssignedTeamService(prismaClient);
    jest
      .spyOn(checkAssignedTeamService, 'checkAssignedTeam')
      .mockResolvedValue(null);

    const checkAssignedPairService = new CheckAssignedPairService(prismaClient);
    jest
      .spyOn(checkAssignedPairService, 'checkAssignedPair')
      .mockResolvedValue(true);

    const updateParticipantDomainService = new UpdateParticipantDomainService(
      participantRepository,
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
