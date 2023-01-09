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
    try {
      PairName.create({
        pairName: '',
      }).pairName;
    } catch (error) {
      expect(DomainException);
    }
  });

  it('[準正常系]: ペア名が英字ではない場合はエラー', () => {
    try {
      PairName.create({
        pairName: 'あ',
      }).pairName;
    } catch (error) {
      expect(DomainException);
    }
  });

  it('[準正常系]: ペア名が1文字ではない場合はエラー', () => {
    try {
      PairName.create({
        pairName: 'aa',
      }).pairName;
    } catch (error) {
      expect(DomainException);
    }
  });
});
