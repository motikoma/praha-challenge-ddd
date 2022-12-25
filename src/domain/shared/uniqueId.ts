import { v4 } from 'uuid';
import { ValueObject } from './valueObject';

type Props = {
  id: string;
};

export class UniqueID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(): UniqueID {
    return new UniqueID({ id: v4() });
  }

  static reconstruct(id: string): UniqueID {
    return new UniqueID({ id });
  }

  get id(): string {
    return this._value.id;
  }
}
