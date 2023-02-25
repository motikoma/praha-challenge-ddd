import { DomainException } from 'src/domain/shared/domain-exception';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { EnrollmentStatus, ENROLLMENT_STATUS } from '../enrollment-status';
import { MailAddress } from '../mail-address';
import { Participant } from '../participant';
import { ParticipantName } from '../participant-name';

describe('Participant', () => {
  it('[正常系]: 初回登録時のステータスは「在籍中」', () => {
    const name = ParticipantName.create({
      lastName: 'sakamoto',
      firstName: 'keisuke',
    });
    const mailAddress = MailAddress.create({
      mailAddress: 'hoge@gmail.com',
    });
    const actual = Participant.create({
      name,
      mailAddress,
    });

    const expected = ENROLLMENT_STATUS.ENROLLED;
    expect(actual.values.enrollmentStatus.value).toBe(expected);
  });

  describe('ステータスに応じたチームやペアの所属可否', () => {
    it('[正常系]: ステータスが「在籍中」の場合、チームやペアに所属できる', () => {
      const id = UniqueID.reconstruct('1');

      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const actual = Participant.reconstruct({
        id,
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.ENROLLED,
          }),
        },
      });

      expect(actual.canBeAssignedPairOrTeam()).toBeTruthy();
    });

    it('[準正常系]: ステータスが「休会中」の場合、チームやペアに所属できない', () => {
      const id = UniqueID.reconstruct('1');

      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const actual = Participant.reconstruct({
        id,
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.ABSENT,
          }),
        },
      });

      expect(() => actual.canBeAssignedPairOrTeam()).toThrowError(
        new DomainException(
          '在籍中ではない場合はチームやペアに割り当てることができません',
        ),
      );
    });

    it('[準正常系]: ステータスが「退会済」の場合、チームやペアに所属できない', () => {
      const id = UniqueID.reconstruct('1');

      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const actual = Participant.reconstruct({
        id,
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.SECEDER,
          }),
        },
      });

      expect(() => actual.canBeAssignedPairOrTeam()).toThrowError(
        new DomainException(
          '在籍中ではない場合はチームやペアに割り当てることができません',
        ),
      );
    });
  });

  describe('ステータスの変更', () => {
    it('[正常系]: ステータスは「在籍中」から「休会中」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.create({
        name,
        mailAddress,
      });

      const absent = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.ABSENT,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(absent);

      const expected = ENROLLMENT_STATUS.ABSENT;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });

    it('[正常系]: ステータスは「在籍中」から「退会済」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.create({
        name,
        mailAddress,
      });

      const enrolled = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.ENROLLED,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(enrolled);

      const expected = ENROLLMENT_STATUS.ENROLLED;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });

    it('[正常系]: ステータスは「休会中」から「退会済」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.ABSENT,
          }),
        },
      });

      const seceder = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.SECEDER,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(seceder);

      const expected = ENROLLMENT_STATUS.SECEDER;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });

    it('[正常系]: ステータスは「休会中」から「在籍中」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.ABSENT,
          }),
        },
      });

      const enrolled = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.ENROLLED,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(enrolled);

      const expected = ENROLLMENT_STATUS.ENROLLED;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });

    it('[正常系]: ステータスは「退会済」から「在籍中」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.SECEDER,
          }),
        },
      });

      const enrolled = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.ENROLLED,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(enrolled);

      const expected = ENROLLMENT_STATUS.ENROLLED;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });

    it('[正常系]: ステータスは「退会済」から「休会中」に変更できる', () => {
      const name = ParticipantName.create({
        lastName: 'sakamoto',
        firstName: 'keisuke',
      });
      const mailAddress = MailAddress.create({
        mailAddress: 'hoge@gmail.com',
      });
      const participant = Participant.reconstruct({
        id: UniqueID.reconstruct('1'),
        values: {
          name,
          mailAddress,
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value: ENROLLMENT_STATUS.SECEDER,
          }),
        },
      });

      const absent = EnrollmentStatus.reconstruct({
        value: ENROLLMENT_STATUS.ABSENT,
      });
      const changedStatusPaticipant =
        participant.changeEnrollmentStatus(absent);

      const expected = ENROLLMENT_STATUS.ABSENT;
      expect(changedStatusPaticipant.values.enrollmentStatus.value).toBe(
        expected,
      );
    });
  });
});
