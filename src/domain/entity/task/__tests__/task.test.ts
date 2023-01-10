import { DomainException } from '../../../shared/domain-exception';
import { TaskName } from '../task-name';
import { Task } from '../task';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { TaskStatus, TASK_STATUS } from '../task-status';

describe('changeTaskStatus', () => {
  describe('課題の所有者に関するテスト', () => {
    it('[正常系]: 課題を所有するユーザーだけが課題ステータスを変更できる', () => {
      const taskStatus = TaskStatus.create();
      const task = createEntity(taskStatus);
      const userId = UniqueID.reconstruct('1');

      const newTaskStatus = TaskStatus.reconstruct({
        value: TASK_STATUS.READY_FOR_REVIEW,
      });
      const changedTask = task.changeTaskStatus(userId, newTaskStatus);

      expect(changedTask.taskStatus.value).toBe(TASK_STATUS.READY_FOR_REVIEW);
    });

    it('[準正常系]: 課題を所有していないユーザーは課題ステータスを変更できない', () => {
      const taskStatus = TaskStatus.create();
      const task = createEntity(taskStatus);
      const userId = UniqueID.reconstruct('2');

      const newTaskStatus = TaskStatus.reconstruct({
        value: TASK_STATUS.READY_FOR_REVIEW,
      });

      expect(() => task.changeTaskStatus(userId, newTaskStatus)).toThrowError(
        new DomainException('課題のオーナー以外は状態を変更できません'),
      );
    });
  });

  describe('課題のステータスに関するテスト', () => {
    describe('正常系に関するテスト', () => {
      it('[正常系]: 「未着手」から「レビュー待ち」に変更できる', () => {
        const taskStatus = TaskStatus.create();
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.READY_FOR_REVIEW,
        });
        const changedTask = task.changeTaskStatus(userId, newTaskStatus);

        const expected = TASK_STATUS.READY_FOR_REVIEW;
        expect(changedTask.taskStatus.value).toBe(expected);
      });

      it('[正常系]: 「未着手」から「完了」に変更できる', () => {
        const taskStatus = TaskStatus.create();
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.DONE,
        });
        const changedTask = task.changeTaskStatus(userId, newTaskStatus);

        const expected = TASK_STATUS.DONE;
        expect(changedTask.taskStatus.value).toBe(expected);
      });

      it('[正常系]: 「レビュー待ち」から「未着手」に変更できる', () => {
        const taskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.READY_FOR_REVIEW,
        });
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.TODO,
        });
        const changedTask = task.changeTaskStatus(userId, newTaskStatus);

        const expected = TASK_STATUS.TODO;
        expect(changedTask.taskStatus.value).toBe(expected);
      });

      it('[正常系]: 「レビュー待ち」から「完了」に変更できる', () => {
        const taskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.READY_FOR_REVIEW,
        });
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.DONE,
        });
        const changedTask = task.changeTaskStatus(userId, newTaskStatus);

        const expected = TASK_STATUS.DONE;
        expect(changedTask.taskStatus.value).toBe(expected);
      });
    });

    describe('準正常系に関するテスト', () => {
      it('[準正常系]: 「完了」から「未着手」に変更できない', () => {
        const taskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.DONE,
        });
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.TODO,
        });

        expect(() => task.changeTaskStatus(userId, newTaskStatus)).toThrowError(
          new DomainException('完了した課題のステータスは変更できません'),
        );
      });

      it('[準正常系]: 「完了」から「レビュー待ち」に変更できない', () => {
        const taskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.DONE,
        });
        const task = createEntity(taskStatus);
        const userId = UniqueID.reconstruct('1');

        const newTaskStatus = TaskStatus.reconstruct({
          value: TASK_STATUS.READY_FOR_REVIEW,
        });

        expect(() => task.changeTaskStatus(userId, newTaskStatus)).toThrowError(
          new DomainException('完了した課題のステータスは変更できません'),
        );
      });
    });
  });
});

const createEntity = (taskStatus: TaskStatus): Task => {
  const id = UniqueID.reconstruct('1');
  const taskName = TaskName.create({
    taskName: 'DBモデリング1',
  });
  const ownerId = UniqueID.reconstruct('1');
  const task = Task.create({
    id,
    values: {
      taskStatus: taskStatus,
      ownerId: ownerId,
    },
  });

  return task;
};
