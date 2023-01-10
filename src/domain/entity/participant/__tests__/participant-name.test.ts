import { DomainException } from '../../../shared/domain-exception';
import { ParticipantName } from '../participant-name';

describe('ParticipantName', () => {
  it('[正常系]: 正しい値を入力すると名字と名前の間に半角スペースが入る', () => {
    const actual = ParticipantName.create({
      lastName: '佐藤',
      firstName: '太郎',
    }).fullName;
    const expected = '佐藤 太郎';
    expect(actual).toBe(expected);
  });

  it('[準正常系]: 名字または名前が空文字の場合はエラー', () => {
    expect(() => {
      ParticipantName.create({
        lastName: '',
        firstName: '',
      });
    }).toThrowError(new DomainException('名字は必須です'));
  });

  it('[準正常系]: 名字が空文字の場合はエラー', () => {
    expect(() => {
      ParticipantName.create({
        lastName: '',
        firstName: '太郎',
      });
    }).toThrowError(new DomainException('名字は必須です'));
  });

  it('[準正常系]: 名前が空文字の場合はエラー', () => {
    expect(() => {
      ParticipantName.create({
        lastName: '佐藤',
        firstName: '',
      });
    }).toThrowError(new DomainException('名前は必須です'));
  });
});
