import { UniqueID } from './uniqueId';

// https://zenn.dev/miyanokomiya/articles/534c9008627aa7
type Props = {
  id?: UniqueID;
  values: {
    [key: string]: unknown;
  };
};

export abstract class Entity<T extends Props> {
  protected readonly _id: UniqueID;
  protected readonly _values: T['values'];

  protected constructor(props: Props) {
    this._id = props.id ? props.id : UniqueID.create();
    this._values = props.values;
  }

  equals(object: Entity<T>): boolean {
    return this._id.equals(object._id);
  }
}
