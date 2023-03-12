import { ApplicationException } from 'src/application/shared/application-exception';
import { Password } from 'src/domain/entity/auth/password';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { ParticipantAuthRepository } from 'src/infrastructure/db/repository/participant-auth-repository-impl';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';
import { PrismaService } from 'src/prisma.service';
import { CreateParticipantUseCase } from '../create-participant.usecase';

describe('create', () => {
  const prismaService = new PrismaService();
  const participantRepository = new ParticipantRepository(prismaService);
  const participantAuthRepository = new ParticipantAuthRepository(
    prismaService,
  );

  const participant = Participant.reconstruct({
    id: UniqueID.reconstruct('1'),
    values: {
      name: ParticipantName.create({ lastName: '山田', firstName: '太郎' }),
      mailAddress: MailAddress.create({ mailAddress: 'hoge@gmail.com' }),
      enrollmentStatus: EnrollmentStatus.create(),
    },
  });

  const password = Password.create({ password: 'password' });

  it('正常系_参加者を作成する際に正しい値がRepositoryの引数に渡る', async () => {
    jest.spyOn(participantRepository, 'create').mockResolvedValue(participant);

    jest
      .spyOn(participantRepository, 'getWithMailAddress')
      .mockResolvedValue(null);

    jest
      .spyOn(participantRepository, 'getWithParticipantId')
      .mockResolvedValue(participant);

    jest.spyOn(participantAuthRepository, 'create').mockImplementation;

    const usecase = new CreateParticipantUseCase(
      prismaService,
      participantRepository,
      participantAuthRepository,
    );

    const result = await usecase.do({
      lastName: participant.name.lastName,
      firstName: participant.name.firstName,
      mailAddress: participant.mailAddress.mailAddress,
      password: password.password,
    });

    expect(participantRepository.getWithMailAddress).toHaveBeenCalledWith(
      expect.objectContaining({
        mailAddress: participant.mailAddress.mailAddress,
      }),
    );

    // TODO: テスト修正
    expect(participantAuthRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(UniqueID),
        // password: expect.objectContaining({ password: 'password' }),
        // role: 2,
      }),
    );

    expect(participantRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(UniqueID),
        name: expect.objectContaining({
          lastName: '山田',
          firstName: '太郎',
        }),
        mailAddress: expect.objectContaining({
          mailAddress: 'hoge@gmail.com',
        }),
        enrollmentStatus: expect.objectContaining({
          value: 1,
        }),
      }),
    );
  });

  it('準正常系_参加者のメールアドレスがすでに存在する場合はエラーになる', async () => {
    jest.spyOn(participantRepository, 'create').mockResolvedValue(participant);

    jest
      .spyOn(participantRepository, 'getWithMailAddress')
      .mockResolvedValue(participant);

    const usecase = new CreateParticipantUseCase(
      prismaService,
      participantRepository,
      participantAuthRepository,
    );

    await expect(
      usecase.do({
        lastName: participant.name.lastName,
        firstName: participant.name.firstName,
        mailAddress: participant.mailAddress.mailAddress,
        password: password.password,
      }),
    ).rejects.toThrowError(
      new ApplicationException('参加者のメールアドレスがすでに存在します'),
    );
  });
});
