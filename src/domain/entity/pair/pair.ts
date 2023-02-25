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
  static readonly MIN_PARTICIPANT_COUNT = 2;
  static readonly MAX_PARTICIPANT_COUNT = 3;

  private constructor(props: ReadonlyProps) {
    const { participantIds } = props.values;

    if (
      participantIds.length !== Pair.MIN_PARTICIPANT_COUNT &&
      participantIds.length !== Pair.MAX_PARTICIPANT_COUNT
    )
      throw new DomainException(
        'ペアは2名または3名の参加者で構成されている必要があります',
      );

    super(props);
  }

  static create(props: ReadonlyValues): Pair {
    const id = UniqueID.create();
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

  removeMember(removeParticipantId: UniqueID) {
    const newParticipantIds = this.participantIds.filter(
      (id) => id.id !== removeParticipantId.id,
    );

    return Pair.reconstruct({
      id: this.id,
      values: { ...this.values, participantIds: newParticipantIds },
    });
  }

  get id() {
    if (!this._id) throw new DomainException('ペアのidが存在しません');
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
