import { DomainException } from '../../shared/domain-exception';
import { Entity } from '../../shared/entity';
import { UniqueID } from '../../shared/uniqueId';
import { Password } from './password';
import { Role } from './role';

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  password: Password;
  roles: Role[];
};
type ReadonlyValues = Readonly<Values>;

export class ParticipantAuth extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): ParticipantAuth {
    return new ParticipantAuth(props);
  }

  get id() {
    if (!this._id) throw new DomainException('id is undefined');
    return this._id;
  }

  get values() {
    return this._values;
  }
}
