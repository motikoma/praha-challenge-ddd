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

  static create(props: ReadonlyValues): Pair {
    const id = UniqueID.create();
    const { participantIds } = props;

    if (participantIds.length !== 2 && participantIds.length !== 3)
      throw new DomainException(
        'ペアは2名または3名の参加者で構成されている必要があります',
      );

    return new Pair({ id, values: props });
  }

  static reconstruct(props: ReadonlyProps): Pair {
    return new Pair(props);
  }

  addMember(addParticipantId: UniqueID) {
    const newParticipantIds = [...this.participantIds, addParticipantId];

    return Pair.reconstruct({
      id: this.id,
      values: { ...this.values, participantIds: newParticipantIds },
    });
  }

  deleteMember(deleteParticipantId: UniqueID) {
    const newParticipantIds = this.participantIds.filter(
      (id) => id.id !== deleteParticipantId.id,
    );

    return Pair.reconstruct({
      id: this.id,
      values: { ...this.values, participantIds: newParticipantIds },
    });
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
