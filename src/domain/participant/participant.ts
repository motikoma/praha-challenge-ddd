import { ParticipantName } from './participant-name';
import { Entity } from '../shared/entity';
import { MailAddress } from './mail-address';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { EnrollmentStatus, ENROLLMENT_STATUS } from './enrollment-status';

// const ENROLLMENT_STATUS = {
//   ENROLLED: '1',
//   ABSENT: '2',
//   SECEDER: '3',
// } as const;

// type EnrollmentStatus =
//   typeof ENROLLMENT_STATUS[keyof typeof ENROLLMENT_STATUS];

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  name: ParticipantName;
  mailAddress: MailAddress;
  enrollmentStatus: EnrollmentStatus;
};
type ReadonlyValues = Readonly<Values>;

type CreateValues = {
  name: ParticipantName;
  mailAddress: MailAddress;
};
type ReadonlyCreateValues = Readonly<CreateValues>;

export class Participant extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create({ name, mailAddress }: ReadonlyCreateValues): Participant {
    const props = {
      id: UniqueID.create(),
      values: {
        name,
        mailAddress,
        enrollmentStatus: EnrollmentStatus.create(),
      },
    };
    return new Participant(props);
  }

  static reconstruct(props: ReadonlyProps): Participant {
    return new Participant(props);
  }

  getAllProperties(): ReadonlyProps {
    return {
      id: this._id,
      values: this._values,
    };
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._values.name;
  }

  get mailAddress() {
    return this._values.mailAddress;
  }

  get enrollmentStatus() {
    return this._values.enrollmentStatus;
  }
}
