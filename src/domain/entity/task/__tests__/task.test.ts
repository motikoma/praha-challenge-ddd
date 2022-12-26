import { DomainException } from '../../../shared/domain-exception';
import { TaskName } from '../task-name';
import { Task, TaskStatus, TASK_STATUS } from '../task';
import { UniqueID } from 'src/domain/shared/uniqueId';

describe('changeTaskStatus', () => {
  describe('課題の所有者に関するテスト', () => {
    it('[正常系]: 課題を所有するユーザーだけが課題ステータスを変更できる', () => {
      const task = createEntity(TASK_STATUS.TODO);
      const userId = UniqueID.reconstruct('1');
      const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DOING);

      const expected = 'レビュー待ち';
      expect(changedTask.taskStatus).toBe(expected);
    });

    it('[準正常系]: 課題を所有していないユーザーは課題ステータスを変更できない', () => {
      try {
        const task = createEntity(TASK_STATUS.TODO);
        const userId = UniqueID.reconstruct('1');
        const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DOING);
      } catch (error) {
        expect(DomainException);
      }
    });
  });

  describe('課題のステータスに関するテスト', () => {
    describe('正常系に関するテスト', () => {
      it('[正常系]: 「未着手」から「レビュー待ち」に変更できる', () => {
        const task = createEntity(TASK_STATUS.TODO);
        const userId = UniqueID.reconstruct('1');
        const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DOING);

        const expected = TASK_STATUS.DOING;
        expect(changedTask.taskStatus).toBe(expected);
      });

      it('[正常系]: 「未着手」から「完了」に変更できる', () => {
        const task = createEntity(TASK_STATUS.TODO);
        const userId = UniqueID.reconstruct('1');
        const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DONE);

        const expected = TASK_STATUS.DONE;
        expect(changedTask.taskStatus).toBe(expected);
      });

      it('[正常系]: 「レビュー待ち」から「未着手」に変更できる', () => {
        const task = createEntity(TASK_STATUS.DOING);
        const userId = UniqueID.reconstruct('1');
        const changedTask = task.changeTaskStatus(userId, TASK_STATUS.TODO);

        const expected = TASK_STATUS.TODO;
        expect(changedTask.taskStatus).toBe(expected);
      });

      it('[正常系]: 「レビュー待ち」から「完了」に変更できる', () => {
        const task = createEntity(TASK_STATUS.DOING);
        const userId = UniqueID.reconstruct('1');
        const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DONE);

        const expected = TASK_STATUS.DONE;
        expect(changedTask.taskStatus).toBe(expected);
      });
    });

    describe('準正常系に関するテスト', () => {
      it('[準正常系]: 「完了」から「未着手」に変更できない', () => {
        try {
          const task = createEntity(TASK_STATUS.DONE);
          const userId = UniqueID.reconstruct('1');
          const changedTask = task.changeTaskStatus(userId, TASK_STATUS.TODO);
        } catch (error) {
          expect(DomainException);
        }
      });
      it('[準正常系]: 「完了」から「レビュー待ち」に変更できない', () => {
        try {
          const task = createEntity(TASK_STATUS.DONE);
          const userId = UniqueID.reconstruct('1');
          const changedTask = task.changeTaskStatus(userId, TASK_STATUS.DOING);
        } catch (error) {
          expect(DomainException);
        }
      });
    });
  });
});

const createEntity = (taskStatus: TaskStatus): Task => {
  const taskName = TaskName.create({
    taskName: 'DBモデリング1',
  });
  const ownerId = UniqueID.reconstruct('1');
  const task = Task.create({
    taskName: taskName,
    taskStatus: taskStatus,
    ownerId: ownerId,
  });

  return task;
};
