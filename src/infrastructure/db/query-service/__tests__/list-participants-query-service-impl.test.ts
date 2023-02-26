import { Filter } from 'src/application/participant/query-service/list-participants-query-service';
import { Page } from 'src/domain/shared/page';
import { InfraException } from 'src/infrastructure/infra-exception';
import { PrismaService } from 'src/prisma.service';
import { ParticipantRepository } from '../../repository/participant-repository-impl';
import { TaskRepository } from '../../repository/task-repository-impl';
import { createParticipantData } from '../../shared/testDataFactory/create-participant-data';
import { createTaskData } from '../../shared/testDataFactory/create-task-data';
import { ListParticipantsQueryService } from '../list-participants-query-service-impl';

describe('list-participant-query-service-impl', () => {
  const prisma = new PrismaService();
  const taskRepository = new TaskRepository(prisma);
  const participantRepository = new ParticipantRepository(prisma);
  const queryService = new ListParticipantsQueryService(prisma);

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

  describe('課題idと課題ステータスが合致する参加者が参加者登録日の降順で返る', () => {
    describe('課題ステータスが指定されていない場合', () => {
      it('[正常系]課題idが空配列の場合は全参加者数が返る', async () => {
        /**
         * 参加者データ30人分作成
         */
        const participantsNumber = 30;
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 2,
          startParticipantId: 10,
          endParticipantId: 21,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 21,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 21,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 2,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 2,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });
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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 3,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
        await createParticipantData({
          participantRepository,
          participantsNumber,
        });

        /**
         * 課題データ作成
         */
        await createTaskData({
          taskRepository,
          taskId: '1',
          status: 1,
          startParticipantId: 0,
          endParticipantId: 5,
        });

        await createTaskData({
          taskRepository,
          taskId: '2',
          status: 3,
          startParticipantId: 0,
          endParticipantId: 10,
        });

        await createTaskData({
          taskRepository,
          taskId: '3',
          status: 3,
          startParticipantId: 10,
          endParticipantId: 20,
        });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
      await createParticipantData({
        participantRepository,
        participantsNumber,
      });

      /**
       * 課題データ作成
       */
      await createTaskData({
        taskRepository,
        taskId: '1',
        status: 1,
        startParticipantId: 0,
        endParticipantId: 5,
      });

      await createTaskData({
        taskRepository,
        taskId: '2',
        status: 2,
        startParticipantId: 0,
        endParticipantId: 10,
      });

      await createTaskData({
        taskRepository,
        taskId: '3',
        status: 3,
        startParticipantId: 10,
        endParticipantId: 20,
      });

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
});
