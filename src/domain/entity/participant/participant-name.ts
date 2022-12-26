import { ValueObject } from '../../shared/valueObject';
import { DomainException } from '../../shared/domain-exception';

type Props = {
  lastName: string;
  firstName: string;
};
type ReadonlyProps = Readonly<Props>;

export class ParticipantName extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): ParticipantName {
    const { lastName, firstName } = props;
    if (!lastName) throw new DomainException('名字は必須です');
    if (lastName.length === 0)
      throw new DomainException('名字は1文字以上で入力してください');
    if (!firstName) throw new DomainException('名前は必須です');
    if (firstName.length === 0)
      throw new DomainException('名前は1文字以上で入力してください');
    return new ParticipantName(props);
  }

  get fullName(): string {
    return this._value.lastName + ' ' + this._value.firstName;
  }

  get lastName(): string {
    return this._value.lastName;
  }

  get firstName(): string {
    return this._value.firstName;
  }

  static reconstruct(props: ReadonlyProps): ParticipantName {
    return new ParticipantName(props);
  }
}
