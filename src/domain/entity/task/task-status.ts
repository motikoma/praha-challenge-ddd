import { DomainException } from '../../shared/domain-exception';
import { ValueObject } from '../../shared/valueObject';

export const TASK_STATUS = {
  TODO: 1,
  READY_FOR_REVIEW: 2,
  DONE: 3,
} as const;

type Props = {
  value: number;
};
type ReadonlyProps = Readonly<Props>;

export class TaskStatus extends ValueObject<ReadonlyProps> {
  get value(): number {
    return this._value.value;
  }

  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(): TaskStatus {
    return new TaskStatus({ value: TASK_STATUS.TODO });
  }

  static reconstruct(props: ReadonlyProps): TaskStatus {
    const status = this.toTaskStatus(props.value);
    return new TaskStatus({ value: status });
  }

  private static toTaskStatus(status: number) {
    switch (status) {
      case 1:
        return TASK_STATUS.TODO;
      case 2:
        return TASK_STATUS.READY_FOR_REVIEW;
      case 3:
        return TASK_STATUS.DONE;
      default:
        throw new DomainException('invalid value');
    }
  }
}
