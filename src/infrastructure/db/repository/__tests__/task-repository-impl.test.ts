import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Task } from 'src/domain/entity/task/task';
import { TaskStatus, TASK_STATUS } from 'src/domain/entity/task/task-status';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';
import { ParticipantRepository } from '../participant-repository-impl';

import { TaskRepository } from '../task-repository-impl';

describe('task-repository-impl', () => {
  const prisma = new PrismaService();

  const participantRepository = new ParticipantRepository(prisma);
  const taskRepository = new TaskRepository(prisma);

  beforeEach(async () => {
    await prisma.participantOnEnrollmentStatus.deleteMany();
    await prisma.participantMailAddress.deleteMany();
    await prisma.participantOnTask.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('[正常系]create: 参加者に紐付けて作成した課題が返る', async () => {
    const participantId = UniqueID.reconstruct('1');
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
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

    const id = UniqueID.reconstruct('1');
    const taskStatus = TaskStatus.create();
    const task = Task.create({
      id,
      values: {
        ownerId: participantId,
        taskStatus,
      },
    });

    const actual = await taskRepository.create(task);
    expect(actual).toBeInstanceOf(Task);
  });

  it('[正常系]updateStatus: ステータスがアップデートされた課題が返る', async () => {
    const participantId = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
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

    const participantId2 = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee94',
    );
    const name2 = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress2 = MailAddress.create({
      mailAddress: 'hoge2@gmail.com',
    });
    const enrollmentStatus2 = EnrollmentStatus.create();

    const participant2 = Participant.reconstruct({
      id: participantId2,
      values: {
        name: name2,
        mailAddress: mailAddress2,
        enrollmentStatus: enrollmentStatus2,
      },
    });
    await participantRepository.create(participant2);

    /**
     * 課題データ作成
     */
    const id = UniqueID.reconstruct('2');
    const ownerId = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const taskStatus = TaskStatus.create();
    const task = Task.create({
      id,
      values: {
        ownerId,
        taskStatus,
      },
    });
    const taskEntity = await taskRepository.create(task);

    /**
     * 課題ステータス変更
     */
    const newTaskStatus = TaskStatus.reconstruct({
      value: TASK_STATUS.READY_FOR_REVIEW,
    });
    const newTask = Task.create({
      id: taskEntity.id, // 変更前のIDを指定
      values: {
        ownerId: taskEntity.ownerId, // 変更前のownerIdを指定
        taskStatus: newTaskStatus,
      },
    });
    const actual = await taskRepository.updateStatus(newTask);

    expect(actual).toBeInstanceOf(Task);
    expect(actual?.ownerId).toEqual(newTask.ownerId);
    expect(actual?.taskStatus).toEqual(newTask.taskStatus);
  });
});
