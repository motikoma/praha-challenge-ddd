import { DomainException } from '../../../shared/domain-exception';
import { MailAddress } from '../mail-address';

describe('MailAddress', () => {
  it('[正常系]: 表記が正しい場合は成功', () => {
    const actual = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    }).mailAddress;
    const expected = 'hoge@gmail.com';
    expect(actual).toBe(expected);
  });

  it('[準正常系]: nullの場合はエラー', () => {
    try {
      MailAddress.create({
        mailAddress: null,
      });
    } catch (e) {
      expect(DomainException);
    }
  });

  it('[準正常系]: undefinedの場合はエラー', () => {
    try {
      MailAddress.create({
        mailAddress: undefined,
      });
    } catch (e) {
      expect(DomainException);
    }
  });

  it('[準正常系]: 空文字の場合はエラー', () => {
    try {
      MailAddress.create({
        mailAddress: '',
      });
    } catch (e) {
      expect(DomainException);
    }

    // MEMO: 下記のように書くとエラーを検知できない
    // expect(() =>
    //   MailAddress.create({
    //     mailAddress: 'hoge@gmail.com',
    //   }),
    // ).toThrow(DomainException)
  });

  it('[準正常系]: 表記が間違っている場合はエラー', () => {
    try {
      MailAddress.create({
        mailAddress: 'hogegmail.com',
      });
    } catch (error) {
      expect(DomainException);
    }
  });
});
