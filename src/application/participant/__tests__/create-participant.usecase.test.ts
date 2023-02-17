import { PrismaClient } from '@prisma/client';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { CreateParticipantUseCase } from '../create-participant.usecase';
import { ParticipantRepository } from 'src/infrastructure/db/repository/participant-repository-impl';
import { ApplicationException } from 'src/application/shared/application-exception';

describe('create', () => {
  const prismaClient = new PrismaClient();
  const participantRepository = new ParticipantRepository(prismaClient);

  const participant = Participant.reconstruct({
    id: UniqueID.reconstruct('1'),
    values: {
      name: ParticipantName.create({ lastName: '山田', firstName: '太郎' }),
      mailAddress: MailAddress.create({ mailAddress: 'hoge@gmail.com' }),
      enrollmentStatus: EnrollmentStatus.create(),
    },
  });

  it('正常系_参加者を作成する際に正しい値がRepositoryの引数に渡る', async () => {
    jest.spyOn(participantRepository, 'create').mockResolvedValue(participant);

    jest
      .spyOn(participantRepository, 'getWithMailAddress')
      .mockResolvedValue(null);

    const usecase = new CreateParticipantUseCase(participantRepository);

    const result = await usecase.do({
      lastName: participant.name.lastName,
      firstName: participant.name.firstName,
      mailAddress: participant.mailAddress.mailAddress,
    });

    // participanRepositoryに引数として渡した値をチェック
    expect(participantRepository.getWithMailAddress).toHaveBeenCalledWith(
      expect.objectContaining({
        mailAddress: participant.mailAddress.mailAddress,
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

    const usecase = new CreateParticipantUseCase(participantRepository);

    await expect(
      usecase.do({
        lastName: participant.name.lastName,
        firstName: participant.name.firstName,
        mailAddress: participant.mailAddress.mailAddress,
      }),
    ).rejects.toThrowError(
      new ApplicationException('参加者のメールアドレスがすでに存在します'),
    );
  });
});
