import { DomainException } from '../../../shared/domain-exception';
import { PairName } from '../pair-name';

describe('PairName', () => {
  it('[正常系]: ペア名は英字かつ1文字を入力した場合はOK', () => {
    const actual = PairName.create({
      pairName: 'a',
    }).pairName;
    const expected = 'a';
    expect(actual).toBe(expected);
  });

  it('[準正常系]: ペア名が空文字の場合はエラー', () => {
    expect(() =>
      PairName.create({
        pairName: '',
      }),
    ).toThrowError(
      new DomainException('ペア名は英文字1文字で入力してください'),
    );
  });

  it('[準正常系]: ペア名が英字ではない場合はエラー', () => {
    expect(() =>
      PairName.create({
        pairName: 'あ',
      }),
    ).toThrowError(
      new DomainException('ペア名は英文字1文字で入力してください'),
    );
  });

  it('[準正常系]: ペア名が1文字ではない場合はエラー', () => {
    expect(() =>
      PairName.create({
        pairName: 'aa',
      }),
    ).toThrowError(
      new DomainException('ペア名は英文字1文字で入力してください'),
    );
  });
});
