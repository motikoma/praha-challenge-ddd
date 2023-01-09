import { DomainException } from '../../../shared/domain-exception';
import { TaskName } from '../task-name';

describe('TaskName', () => {
  it('[正常系]: 課題名に1文字以上を入力した場合はOK', () => {
    const actual = TaskName.create({
      taskName: 'DBモデリング1',
    }).taskName;
    const expected = 'DBモデリング1';
    expect(actual).toBe(expected);
  });

  it('[準正常系]: 課題名が空文字の場合はエラー', () => {
    try {
      TaskName.create({
        taskName: '',
      }).taskName;
    } catch (error) {
      console.log(error);
      expect(DomainException);
    }
  });
});
