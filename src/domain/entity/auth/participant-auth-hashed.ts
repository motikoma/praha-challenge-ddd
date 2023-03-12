import { DomainException } from '../../shared/domain-exception';
import { Entity } from '../../shared/entity';
import { UniqueID } from '../../shared/uniqueId';
import { Role } from './role';

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  passwordHashed: string; // パスワードをハッシュ化したもの
  roles: Role[];
};
type ReadonlyValues = Readonly<Values>;

export class ParticipantAuthHashed extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): ParticipantAuthHashed {
    return new ParticipantAuthHashed(props);
  }

  get id() {
    if (!this._id) throw new DomainException('id is undefined');
    return this._id;
  }

  get values() {
    return this._values;
  }
}
