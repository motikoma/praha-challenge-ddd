import { TeamName } from './team-name';
import { Entity } from '../../shared/entity';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from 'src/domain/shared/domain-exception';
import { Pair } from '../pair/pair';

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  name: TeamName;
  participantIds: UniqueID[];
  pairs: Pair[];
};
type ReadonlyValues = Readonly<Values>;

export class Team extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): Team {
    const { values } = props;
    if (values.participantIds.length < 3)
      throw new DomainException(
        'チームは最低3名の参加者で構成されている必要があります',
      );

    return new Team(props);
  }

  static reconstruct(props: ReadonlyProps): Team {
    return new Team(props);
  }

  addMember(addParticipantId: UniqueID) {
    const newParticipantIds = [...this.participantIds, addParticipantId];

    return Team.create({
      id: this.id,
      values: { ...this.values, participantIds: newParticipantIds },
    });
  }

  removeMember(deleteParticipantId: UniqueID) {
    const newParticipantIds = this.participantIds.filter(
      (id) => id.id !== deleteParticipantId.id,
    );

    return Team.create({
      id: this.id,
      values: { ...this.values, participantIds: newParticipantIds },
    });
  }

  getPairWithParticipantId(participantId: UniqueID) {
    const pair = this.pairs.find((pair) => {
      return pair.participantIds.includes(participantId);
    });
    if (!pair) throw new DomainException('ペアが存在しません');
    return pair;
  }

  addPair(newPair: Pair) {
    const isAllParticipantIds = newPair.participantIds.every((id) =>
      this.participantIds.some((participantId) => participantId.equals(id)),
    );
    if (!isAllParticipantIds) {
      throw new DomainException(
        'ペアは同一チームの参加者で構成される必要があります',
      );
    }

    const newPairs = [...this.values.pairs, newPair];
    return Team.create({
      id: this.id,
      values: { ...this.values, pairs: newPairs },
    });
  }

  updatePair(updatePair: Pair) {
    const isAllParticipantIds = updatePair.participantIds.every((id) =>
      this.participantIds.some((participantId) => participantId.equals(id)),
    );
    if (!isAllParticipantIds) {
      throw new DomainException(
        'ペアは同一チームの参加者で構成される必要があります',
      );
    }

    // チームからupdatePairと同じidを持つペアを削除して、再度updatePairを追加する
    const newPairs = this.values.pairs.filter(
      (pair) => pair.id.id !== updatePair.id.id,
    );
    newPairs.push(updatePair);

    return Team.create({
      id: this.id,
      values: { ...this.values, pairs: newPairs },
    });
  }

  removePair(deletePairId: UniqueID) {
    const newPairs = this.values.pairs.filter(
      (pair) => pair.id.id !== deletePairId.id,
    );

    return Team.create({
      id: this.id,
      values: { ...this.values, pairs: newPairs },
    });
  }

  get id() {
    if (!this._id) throw new DomainException('チームidが存在しません');
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

  get pairs() {
    return this._values.pairs;
  }
}
