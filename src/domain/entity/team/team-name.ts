import { ValueObject } from '../../shared/valueObject';
import { DomainException } from '../../shared/domain-exception';

type Props = {
  teamName: number;
};
type ReadonlyProps = Readonly<Props>;

export class TeamName extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): TeamName {
    const { teamName: teamName } = props;

    if (teamName.toString().length > 3)
      throw new DomainException('チーム名は数字3文字以下で入力してください');

    return new TeamName({ teamName });
  }

  get teamName(): number {
    return this._value.teamName;
  }
}
