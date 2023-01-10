import { DomainException } from '../../../shared/domain-exception';
import { TeamName } from '../team-name';

describe('TeamName', () => {
  describe('チーム名が正の整数3文字以下の場合は作成に成功', () => {
    it('[正常系]: チーム名が正の整数1文字の場合は作成に成功', () => {
      const actual = TeamName.create({
        teamName: 1,
      }).teamName;
      const expected = 1;
      expect(actual).toBe(expected);
    });

    it('[正常系]: チーム名が正の整数2文字の場合は作成に成功', () => {
      const actual = TeamName.create({
        teamName: 11,
      }).teamName;
      const expected = 11;
      expect(actual).toBe(expected);
    });

    it('[正常系]: チーム名が正の整数3文字の場合は作成に成功', () => {
      const actual = TeamName.create({
        teamName: 111,
      }).teamName;
      const expected = 111;
      expect(actual).toBe(expected);
    });

    it('[準正常系]: チーム名が0の場合は作成に失敗', () => {
      try {
        const actual = TeamName.create({
          teamName: 0,
        }).teamName;
      } catch (error) {
        expect(DomainException);
      }
    });

    it('[準正常系]: チーム名が負の整数の場合は作成に失敗', () => {
      try {
        const actual = TeamName.create({
          teamName: -1,
        }).teamName;
      } catch (error) {
        expect(DomainException);
      }
    });

    it('[準正常系]: チーム名が小数の場合は作成に失敗', () => {
      try {
        const actual = TeamName.create({
          teamName: 1.1,
        }).teamName;
      } catch (error) {
        expect(
          new DomainException(
            'チーム名は正の整数3文字以下である必要があります',
          ),
        );
      }
    });
  });
});
