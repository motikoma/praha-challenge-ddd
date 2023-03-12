import { DomainException } from '../../shared/domain-exception';
import { ValueObject } from '../../shared/valueObject';

type Props = {
  password: string;
};
type ReadonlyProps = Readonly<Props>;

export class Password extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): Password {
    if (props.password.length === 0)
      throw new DomainException('password is required');

    // パスワードは5文字以上8文字以下の英数字であること
    const regex = /^[a-zA-Z0-9]{5,8}$/;
    if (!regex.test(props.password))
      throw new DomainException('password is invalid');

    return new Password(props);
  }

  get password(): string {
    return this._value.password;
  }
}
