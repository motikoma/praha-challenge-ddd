import { ValueObject } from '../../shared/valueObject';
import { DomainException } from '../../shared/domain-exception';

type Props = {
  taskName: string;
};
type ReadonlyProps = Readonly<Props>;

export class TaskName extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): TaskName {
    const { taskName } = props;
    if (!taskName) throw new DomainException('課題名は必須です');
    if (taskName.length === 0)
      throw new DomainException('課題名は1文字以上で入力してください');

    return new TaskName(props);
  }

  get taskName(): string {
    return this._value.taskName;
  }
}
