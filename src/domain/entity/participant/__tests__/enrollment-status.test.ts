import { DomainException } from 'src/domain/shared/domain-exception';
import { EnrollmentStatus, ENROLLMENT_STATUS } from '../enrollment-status';

describe('EnrollmentStatus', () => {
  it('[正常系]: createした場合、ステータスは「在籍中」', () => {
    const actual = EnrollmentStatus.create().value;
    const expected = ENROLLMENT_STATUS.ENROLLED;
    expect(actual).toBe(expected);
  });

  describe('reconstructに正常な文字列を渡した場合', () => {
    it('[正常系]: reconstructに文字列の1を渡した場合、ステータスは「在籍中」', () => {
      const actual = EnrollmentStatus.reconstruct({ value: 1 }).value;
      const expected = ENROLLMENT_STATUS.ENROLLED;
      expect(actual).toBe(expected);
    });

    it('[正常系]: reconstructに文字列の2を渡した場合、ステータスは「休会中」', () => {
      const actual = EnrollmentStatus.reconstruct({ value: 2 }).value;
      const expected = ENROLLMENT_STATUS.ABSENT;
      expect(actual).toBe(expected);
    });

    it('[正常系]: reconstructに文字列の3を渡した場合、ステータスは「退会済」', () => {
      const actual = EnrollmentStatus.reconstruct({ value: 3 }).value;
      const expected = ENROLLMENT_STATUS.SECEDER;
      expect(actual).toBe(expected);
    });
  });

  describe('reconstructに不正な値を渡した場合', () => {
    it('[準正常系]: reconstructに不正な文字列を渡した場合、エラーになる', () => {
      try {
        EnrollmentStatus.reconstruct({ value: 4 }).value;
      } catch (e) {
        expect(DomainException);
      }
    });
  });
});
