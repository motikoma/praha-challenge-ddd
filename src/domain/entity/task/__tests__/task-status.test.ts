import { TaskStatus, TASK_STATUS } from '../task-status';

describe('TaskStatus', () => {
  it('正常系_タスク作成時のデフォルトステータスはTODO', () => {
    const actual = TaskStatus.create();
    expect(actual.value).toBe(TASK_STATUS.TODO);
  });

  it('正常系_タスクをTODOに変更することができる', () => {
    const actual = TaskStatus.reconstruct({
      value: TASK_STATUS.TODO,
    });
    expect(actual.value).toBe(TASK_STATUS.TODO);
  });

  it('正常系_タスクをREADY_FOR_REVIEWに変更することができる', () => {
    const actual = TaskStatus.reconstruct({
      value: TASK_STATUS.READY_FOR_REVIEW,
    });
    expect(actual.value).toBe(TASK_STATUS.READY_FOR_REVIEW);
  });

  it('正常系_タスクをDONEに変更することができる', () => {
    const actual = TaskStatus.reconstruct({
      value: TASK_STATUS.DONE,
    });
    expect(actual.value).toBe(TASK_STATUS.DONE);
  });

  it('準正常系_存在しないステータスを指定するとエラーになる', () => {
    expect(() => {
      TaskStatus.reconstruct({
        value: 0,
      });
    }).toThrowError('status: 0 は不正な値です');
  });
});
