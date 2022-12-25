import { DomainException } from '../shared/domain-exception';
import { ValueObject } from '../shared/valueObject';

export const ENROLLMENT_STATUS = {
  ENROLLED: '1',
  ABSENT: '2',
  SECEDER: '3',
} as const;

type Props = {
  value: string;
};
type ReadonlyProps = Readonly<Props>;

export class EnrollmentStatus extends ValueObject<ReadonlyProps> {
  get value(): string {
    return this._value.value;
  }

  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(): EnrollmentStatus {
    const status = ENROLLMENT_STATUS.ENROLLED;
    return new EnrollmentStatus({ value: status });
  }

  static reconstruct(props: ReadonlyProps): EnrollmentStatus {
    const status = this.toEnrollmentStatus(props.value);
    return new EnrollmentStatus({ value: status });
  }

  private static toEnrollmentStatus(status: string) {
    switch (status) {
      case '1':
        return ENROLLMENT_STATUS.ENROLLED;
      case '2':
        return ENROLLMENT_STATUS.ABSENT;
      case '3':
        return ENROLLMENT_STATUS.SECEDER;
      default:
        throw new DomainException('invalid value');
    }
  }
}
