import { DomainException } from '../../shared/domain-exception';
import { ValueObject } from '../../shared/valueObject';

export const ROLE = {
  ADMIN: 1,
  USER: 2,
} as const;

type Props = {
  role: number;
};
type ReadonlyProps = Readonly<Props>;

export class Role extends ValueObject<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(): Role {
    return new Role({ role: ROLE.USER });
  }

  static reconstruct(props: ReadonlyProps): Role {
    const role = this.toRole(props.role);
    return new Role({ role });
  }

  private static toRole(status: number) {
    switch (status) {
      case 1:
        return ROLE.ADMIN;
      case 2:
        return ROLE.USER;
      default:
        throw new DomainException('invalid value');
    }
  }

  get role(): number {
    return this._value.role;
  }
}
