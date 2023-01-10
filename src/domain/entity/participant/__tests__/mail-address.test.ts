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

  it('[準正常系]: 空文字の場合はエラー', () => {
    expect(() =>
      MailAddress.create({
        mailAddress: '',
      }),
    ).toThrowError(new DomainException('mailAddress is required'));
  });

  it('[準正常系]: 表記が間違っている場合はエラー', () => {
    expect(() =>
      MailAddress.create({
        mailAddress: 'hogegmail.com',
      }),
    ).toThrowError(new DomainException('mailAddress is invalid'));
  });
});
