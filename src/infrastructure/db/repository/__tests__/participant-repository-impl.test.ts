import {
  EnrollmentStatus,
  ENROLLMENT_STATUS,
} from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { ParticipantRepository } from '../participant-repository-impl';

describe('participant-repository-impl', () => {
  const prisma = new PrismaService();

  // TODO: fabbricaを使ったテストについて調べる
  // initialize({ prisma });

  const repository = new ParticipantRepository(prisma);

  beforeEach(async () => {
    const deleteParticipantEnrollmentStatus =
      await prisma.participantOnEnrollmentStatus.deleteMany();
    const deleteParticipantMailAddress =
      await prisma.participantMailAddress.deleteMany();
    const deleteParticipantOnTask = await prisma.participantOnTask.deleteMany();
    const deleteParticipant = await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    // const deleteParticipantEnrollmentStatus =
    //   await prisma.participantOnEnrollmentStatus.deleteMany();
    // const deleteParticipantMailAddress =
    //   await prisma.participantMailAddress.deleteMany();
    // const deleteParticipant = await prisma.participant.deleteMany();

    // TODO: 公式ドキュメントには、$transactionをまとめて扱う方法が記載されているが型エラーになる
    // https://www.prisma.io/docs/guides/testing/integration-testing
    // await prisma.$transaction([
    //   deleteParticipantEnrollmentStatus,
    //   deleteParticipantMailAddress,
    //   deleteParticipant,
    // ]);

    await prisma.$disconnect();
  });

  it('[正常系]createに成功するとParticipantインスタンスが返る', async () => {
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const participant = Participant.create({
      name,
      mailAddress,
    });

    const actual = await repository.create(participant);
    expect(actual).toBeInstanceOf(Participant);
  });

  it('[正常系]listに成功するとParticipantインスタンスが複数返る', async () => {
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const participant = Participant.create({
      name,
      mailAddress,
    });

    const name2 = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress2 = MailAddress.create({
      mailAddress: 'hoge2@gmail.com',
    });
    const participant2 = Participant.create({
      name: name2,
      mailAddress: mailAddress2,
    });

    await repository.create(participant);
    await repository.create(participant2);

    const actual = await repository.list();
    expect(actual).toHaveLength(2);
  });

  it('[正常系]getWithIdに成功するとParticipantインスタンスが返る', async () => {
    const id = UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee93');
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const enrollmentStatus = EnrollmentStatus.create();
    const participant = Participant.reconstruct({
      id,
      values: {
        name,
        mailAddress,
        enrollmentStatus,
      },
    });

    await repository.create(participant);
    const actual = await repository.getWithParticipantId(participant.id);
    expect(actual).toBeInstanceOf(Participant);
    expect(actual?.id).toEqual(participant.id);
  });

  it('[正常系]getWithMailAddressに成功するとParticipantインスタンスが返る', async () => {
    const id = UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee93');
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const enrollmentStatus = EnrollmentStatus.create();
    const participant = Participant.reconstruct({
      id,
      values: {
        name,
        mailAddress,
        enrollmentStatus,
      },
    });

    await repository.create(participant);
    const actual = await repository.getWithMailAddress(participant.mailAddress);
    expect(actual).toBeInstanceOf(Participant);
    expect(actual?.mailAddress).toEqual(participant.mailAddress);
  });

  it('[正常系]updateに成功すると部分的にアップデートされたParticipantインスタンスが返る', async () => {
    const id = UniqueID.reconstruct('4130b8c4-ca82-48bf-92e1-3f32c618ee93');
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const enrollmentStatus = EnrollmentStatus.create();
    const participant = Participant.reconstruct({
      id,
      values: {
        name,
        mailAddress,
        enrollmentStatus,
      },
    });
    await repository.create(participant);

    const newName = ParticipantName.create({
      lastName: '佐藤',
      firstName: '太郎',
    });
    const newMailAddress = MailAddress.create({
      mailAddress: 'hoge2@gmail.com',
    });
    const newEnrollmentStatus = EnrollmentStatus.reconstruct({
      value: ENROLLMENT_STATUS.ABSENT,
    });
    const newParticipant = Participant.reconstruct({
      id,
      values: {
        name: newName,
        mailAddress: newMailAddress,
        enrollmentStatus: newEnrollmentStatus,
      },
    });
    const actual = await repository.update(newParticipant);

    expect(actual).toBeInstanceOf(Participant);
    expect(actual?.mailAddress).toEqual(newParticipant.mailAddress);
    expect(actual?.name).toEqual(newParticipant.name);
    expect(actual?.enrollmentStatus).toEqual(newParticipant.enrollmentStatus);
  });

  // TODO: fabbricaを使ったテストについてメモリがヒープアウトするので調べる
  // it('[正常系]listに成功するとParticipantインスタンスが複数返る', async () => {
  //   const participantFactory = defineParticipantFactory({
  //     defaultData: async () => ({
  //       ParticipantOnEnrollmentStatus: {
  //         create: await participantOnEnrollmentStatusFactory.build(),
  //       },
  //     }),
  //   });

  //   const enrollmentStatusFactory = defineEnrollmentStatusFactory();
  //   const participantOnEnrollmentStatusFactory =
  //     defineParticipantOnEnrollmentStatusFactory({
  //       defaultData: {
  //         participant: participantFactory,
  //         enrollmentStatus: enrollmentStatusFactory,
  //       },
  //     });
  //   const mailAddressFactory = defineParticipantOnEnrollmentStatusFactory({
  //     defaultData: {
  //       participant: participantFactory,
  //       enrollmentStatus: enrollmentStatusFactory,
  //     },
  //   });

  //   await participantFactory.createList(3);

  //   const result = await repository.list();
  //   expect(result.length).toHaveLength(3);
  // });
});
