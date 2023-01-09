import { ValueObject } from '../../shared/valueObject';
import { DomainException } from '../../shared/domain-exception';

type Props = {
  pairName: string;
};
type ReadonlyProps = Readonly<Props>;

export class PairName extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): PairName {
    const { pairName } = props;
    if (!pairName) throw new DomainException('ペア名は必須です');
    if (!/^[a-zA-Z]{1}$/.test(pairName))
      throw new DomainException('ペア名は英文字1文字で入力してください');

    return new PairName(props);
  }

  get pairName(): string {
    return this._value.pairName;
  }
}
