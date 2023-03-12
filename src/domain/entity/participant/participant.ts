import { DomainException } from 'src/domain/shared/domain-exception';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { Entity } from '../../shared/entity';
import { EnrollmentStatus, ENROLLMENT_STATUS } from './enrollment-status';
import { MailAddress } from './mail-address';
import { ParticipantName } from './participant-name';

type Props = {
  id: UniqueID;
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
  id: UniqueID;
  name: ParticipantName;
  mailAddress: MailAddress;
};
type ReadonlyCreateValues = Readonly<CreateValues>;

export class Participant extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create({ id, name, mailAddress }: ReadonlyCreateValues): Participant {
    const props = {
      id,
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

  canBeAssignedPairOrTeam() {
    if (!(this._values.enrollmentStatus.value === ENROLLMENT_STATUS.ENROLLED))
      throw new DomainException(
        '在籍中ではない場合はチームやペアに割り当てることができません',
      );
    return true;
  }

  changeEnrollmentStatus(enrollmentStatus: EnrollmentStatus) {
    return new Participant({
      id: this.id,
      values: { ...this.values, enrollmentStatus },
    });
  }

  get id() {
    if (!this._id) throw new DomainException('id is undefined');
    return this._id;
  }

  get values() {
    return this._values;
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
