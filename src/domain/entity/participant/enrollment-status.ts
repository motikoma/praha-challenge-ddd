import { DomainException } from '../../shared/domain-exception';
import { ValueObject } from '../../shared/valueObject';

export const ENROLLMENT_STATUS = {
  ENROLLED: 1, // 在籍中
  ABSENT: 2, // 休会中
  SECEDER: 3, // 退会済
} as const;

type Props = {
  value: number;
};
type ReadonlyProps = Readonly<Props>;

export class EnrollmentStatus extends ValueObject<ReadonlyProps> {
  get value(): number {
    return this._value.value;
  }

  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(): EnrollmentStatus {
    return new EnrollmentStatus({ value: ENROLLMENT_STATUS.ENROLLED });
  }

  static reconstruct(props: ReadonlyProps): EnrollmentStatus {
    const status = this.toEnrollmentStatus(props.value);
    return new EnrollmentStatus({ value: status });
  }

  private static toEnrollmentStatus(status: number) {
    switch (status) {
      case 1:
        return ENROLLMENT_STATUS.ENROLLED;
      case 2:
        return ENROLLMENT_STATUS.ABSENT;
      case 3:
        return ENROLLMENT_STATUS.SECEDER;
      default:
        throw new DomainException('invalid value');
    }
  }
}
