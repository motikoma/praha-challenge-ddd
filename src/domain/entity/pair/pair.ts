import { PairName } from './pair-name';
import { Entity } from '../../shared/entity';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from 'src/domain/shared/domain-exception';

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  name: PairName;
  participantIds: UniqueID[];
};
type ReadonlyValues = Readonly<Values>;

export class Pair extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): Pair {
    const { values } = props;
    if (
      values.participantIds.length !== 2 &&
      values.participantIds.length !== 3
    )
      throw new DomainException(
        'ペアを作成する際には2名または3名の参加者が必要です',
      );

    return new Pair(props);
  }

  static reconstruct(props: ReadonlyProps): Pair {
    return new Pair(props);
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

  get participantIds() {
    return this._values.participantIds;
  }
}
