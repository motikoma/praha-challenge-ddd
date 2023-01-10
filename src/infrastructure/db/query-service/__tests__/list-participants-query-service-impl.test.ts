import { Filter } from 'src/application/participant/query-service/list-participants-query-service';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { Task } from 'src/domain/entity/task/task';
import { TaskStatus, TASK_STATUS } from 'src/domain/entity/task/task-status';
import { Page } from 'src/domain/shared/page';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';
import { ParticipantRepository } from '../../repository/participant-repository-impl';
import { TaskRepository } from '../../repository/task-repository-impl';
import { ListParticipantsQueryService } from '../list-participants-query-service-impl';

describe('list-participant-query-service-impl', () => {
  const prisma = new PrismaService();
  const taskRepository = new TaskRepository(prisma);
  const participantRepository = new ParticipantRepository(prisma);
  const queryService = new ListParticipantsQueryService(prisma);

  beforeEach(async () => {
    await prisma.participantOnTask.deleteMany();
    await prisma.participantOnEnrollmentStatus.deleteMany();
    await prisma.participantMailAddress.deleteMany();
    await prisma.participant.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('課題idと課題ステータスが合致する参加者が参加者登録日の降順で返る', () => {
    describe('課題ステータスが指定されていない場合', () => {
      it('[正常系]課題idが空配列の場合は全参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter: Filter = {
          taskIds: [],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-29',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-20',
        );
      });

      it('[正常系]課題idが単一の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          taskIds: ['1'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(5);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-4',
        );
        expect(actual.items[4].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });

      it('[正常系]課題idが複数の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          taskIds: ['1', '2'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-9',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });
    });

    describe('課題ステータスが未着手の場合', () => {
      it('[正常系]課題idが空配列の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 1, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 2, 10, 21);

        /**
         * actual作成
         */
        const filter: Filter = {
          taskStatus: TASK_STATUS.TODO,
          taskIds: [],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-9',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });

      it('[正常系]課題idが単一の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 21);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.TODO,
          taskIds: ['1'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(5);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-4',
        );
        expect(actual.items[4].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });

      it('[正常系]課題idが複数の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 21);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.TODO,
          taskIds: ['1', '2'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-9',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });
    });

    describe('課題ステータスがレビュー待ちの場合', () => {
      it('[正常系]課題idが空配列の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 1, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 2, 10, 20);

        /**
         * actual作成
         */
        const filter: Filter = {
          taskStatus: TASK_STATUS.READY_FOR_REVIEW,
          taskIds: [],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-19',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-10',
        );
      });

      it('[正常系]課題idが単一の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 2, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.READY_FOR_REVIEW,
          taskIds: ['1'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(5);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-4',
        );
        expect(actual.items[4].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });

      it('[正常系]課題idが複数の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 2, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.READY_FOR_REVIEW,
          taskIds: ['1', '2'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-9',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });
    });

    describe('課題ステータスが完了の場合', () => {
      it('[正常系]課題idが空配列の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 1, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter: Filter = {
          taskStatus: TASK_STATUS.DONE,
          taskIds: [],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-19',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-10',
        );
      });

      it('[正常系]課題idが単一の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 3, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 3, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.DONE,
          taskIds: ['1'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(5);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-4',
        );
        expect(actual.items[4].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });

      it('[正常系]課題idが複数の場合は合致した参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData(participantsNumber);

        /**
         * 課題データ作成
         */
        const taskId1 = '1';
        await createTaskData(taskId1, 1, 0, 5);

        const taskId2 = '2';
        await createTaskData(taskId2, 3, 0, 10);

        const taskId3 = '3';
        await createTaskData(taskId3, 3, 10, 20);

        /**
         * actual作成
         */
        const filter = {
          TaskStatus: TASK_STATUS.DONE,
          taskIds: ['1', '2'],
          pagingCondition: {
            pageSize: 10,
            pageNumber: 1,
          },
        };
        const actual = await queryService.list(filter);

        expect(actual).toBeInstanceOf(Page);
        expect(actual.items.length).toBe(10);
        expect(actual.items[0].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-9',
        );
        expect(actual.items[9].id.id).toBe(
          '4130b8c4-ca82-48bf-92e1-3f32c618ee-0',
        );
      });
    });
  });

  describe('ページ番号とページサイズを指定する必要がある', () => {
    it('[正常系]ページ番号が正の数値の場合は合致する結果を返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 10,
          pageNumber: 1,
        },
      };
      const actual = await queryService.list(filter);

      expect(actual).toBeInstanceOf(Page);
      expect(actual.items.length).toBe(10);
      expect(actual.items[0].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-29',
      );
      expect(actual.items[9].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-20',
      );
    });

    it('[準正常系]ページ番号が0の場合はエラーを返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 10,
          pageNumber: 0,
        },
      };

      try {
        const actual = await queryService.list(filter);
      } catch (error: any) {
        expect(error).toBeInstanceOf(InfraException);
        expect(error.message).toBe('ページ番号は1以上を指定してください');
      }
    });
    it('[準正常系]ページ番号が負の数値の場合はエラーを返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 10,
          pageNumber: 0,
        },
      };

      try {
        const actual = await queryService.list(filter);
      } catch (error: any) {
        expect(error).toBeInstanceOf(InfraException);
        expect(error.message).toBe('ページ番号は1以上を指定してください');
      }
    });
    it('[正常系]ページサイズが正の数値の場合は合致する結果を返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 10,
          pageNumber: 1,
        },
      };
      const actual = await queryService.list(filter);
      expect(actual).toBeInstanceOf(Page);
      expect(actual.items.length).toBe(10);
      expect(actual.items[0].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-29',
      );
      expect(actual.items[9].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-20',
      );

      /**
       * actual2作成
       */
      const filter2: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 10,
          pageNumber: 2,
        },
      };
      const actual2 = await queryService.list(filter2);
      expect(actual2).toBeInstanceOf(Page);
      expect(actual2.items.length).toBe(10);
      expect(actual2.items[0].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-19',
      );
      expect(actual2.items[9].id.id).toBe(
        '4130b8c4-ca82-48bf-92e1-3f32c618ee-10',
      );
    });
    it('[準正常系]ページサイズが0の場合はエラーを返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 0,
          pageNumber: 1,
        },
      };

      try {
        const actual = await queryService.list(filter);
      } catch (error: any) {
        expect(error).toBeInstanceOf(InfraException);
        expect(error.message).toBe('ページ番号は1以上を指定してください');
      }
    });
    it('[準正常系]ページサイズが負の数値の場合はエラーを返す', async () => {
      /**
       * 参加者データ30人分作成
       */
      const participantsNumber = 30;
      await createParticipantData(participantsNumber);

      /**
       * 課題データ作成
       */
      const taskId1 = '1';
      await createTaskData(taskId1, 1, 0, 5);

      const taskId2 = '2';
      await createTaskData(taskId2, 2, 0, 10);

      const taskId3 = '3';
      await createTaskData(taskId3, 3, 10, 20);

      /**
       * actual作成
       */
      const filter: Filter = {
        taskIds: [],
        pagingCondition: {
          pageSize: 1,
          pageNumber: -1,
        },
      };

      try {
        const actual = await queryService.list(filter);
      } catch (error: any) {
        expect(error).toBeInstanceOf(InfraException);
        expect(error.message).toBe('ページ番号は1以上を指定してください');
      }
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
   * 課題テストデータ作成メソッド
   *
   * @param taskId 課題ID
   * @param taskStatus 課題ステータス
   * @param taskNumber 課題数
   * @param startParticipantId 参加者IDの開始番号
   */
  const createTaskData = async (
    taskId: string,
    status: number,
    startParticipantId: number,
    endParticipantId: number,
  ) => {
    for (let i = startParticipantId; i < endParticipantId; i++) {
      const id = UniqueID.reconstruct(taskId);
      const ownerId = UniqueID.reconstruct(
        `4130b8c4-ca82-48bf-92e1-3f32c618ee-${i}`,
      );
      const taskStatus = TaskStatus.reconstruct({ value: status });
      const task = Task.create({
        id,
        values: {
          ownerId,
          taskStatus,
        },
      });

      await taskRepository.create(task);
    }
  };
});
