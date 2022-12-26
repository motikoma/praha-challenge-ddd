import { ValueObject } from '../../shared/valueObject';
import { DomainException } from '../../shared/domain-exception';

type Props = {
  mailAddress: string;
};
type ReadonlyProps = Readonly<Props>;

export class MailAddress extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): MailAddress {
    if (!props.mailAddress)
      throw new DomainException('mailAddress is required');
    if (props.mailAddress.length === 0)
      throw new DomainException('mailAddress is required');

    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!regex.test(props.mailAddress))
      throw new DomainException('mailAddress is invalid');
    return new MailAddress(props);
  }

  get mailAddress(): string {
    return this._value.mailAddress;
  }

  static reconstruct(props: ReadonlyProps): MailAddress {
    return new MailAddress(props);
  }
}
