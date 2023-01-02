import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Task } from 'src/domain/entity/task/task';
import { TaskName } from 'src/domain/entity/task/task-name';
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
    await prisma.task.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('[正常系]createに成功するとTaskインスタンスが返る', async () => {
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

    const ownerId = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const taskName = TaskName.create({
      taskName: 'task1',
    });
    const taskStatus = TaskStatus.create();
    const task = Task.create({
      ownerId,
      taskName,
      taskStatus,
    });

    const actual = await taskRepository.create(task);
    expect(actual).toBeInstanceOf(Task);
  });

  it('[正常系]listに成功するとTaskインスタンスが複数返る', async () => {
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

    const ownerId = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const taskName = TaskName.create({
      taskName: 'task1',
    });
    const taskStatus = TaskStatus.create();
    const task1 = Task.create({
      ownerId,
      taskName,
      taskStatus,
    });

    const ownerId2 = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const taskName2 = TaskName.create({
      taskName: 'task2',
    });
    const taskStatus2 = TaskStatus.create();
    const task2 = Task.create({
      ownerId: ownerId2,
      taskName: taskName2,
      taskStatus: taskStatus2,
    });

    await taskRepository.create(task1);
    await taskRepository.create(task2);

    const actual = await taskRepository.list();
    expect(actual).toHaveLength(2);
  });

  it('[正常系]updateに成功すると部分的にアップデートされたParticipantインスタンスが返る', async () => {
    /**
     * 参加者データ作成
     */
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
    const ownerId = UniqueID.reconstruct(
      '4130b8c4-ca82-48bf-92e1-3f32c618ee93',
    );
    const taskName = TaskName.create({
      taskName: 'task1',
    });
    const taskStatus = TaskStatus.create();
    const task = Task.create({
      ownerId,
      taskName,
      taskStatus,
    });
    const taskEntity = await taskRepository.create(task);

    /**
     * 課題データ変更
     * - 課題IDとオーナーIDは変更できない
     */
    const newTaskName = TaskName.create({
      taskName: 'task2',
    });
    const newTaskStatus = TaskStatus.reconstruct({
      value: TASK_STATUS.READY_FOR_REVIEW,
    });
    const newTask = Task.reconstruct({
      id: taskEntity.id, // 変更前のIDを指定
      values: {
        ownerId: taskEntity.ownerId, // 変更前のownerIdを指定
        taskName: newTaskName,
        taskStatus: newTaskStatus,
      },
    });
    const actual = await taskRepository.update(newTask);

    expect(actual).toBeInstanceOf(Task);
    expect(actual?.ownerId).toEqual(newTask.ownerId);
    expect(actual?.taskName).toEqual(newTask.taskName);
    expect(actual?.taskStatus).toEqual(newTask.taskStatus);
  });
});
