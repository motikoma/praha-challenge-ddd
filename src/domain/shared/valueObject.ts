import { shallowEqual } from 'shallow-equal-object'

export abstract class ValueObject<T> {
  protected constructor(protected readonly _value: T) {}

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false
    if (vo._value === undefined) return false
    return shallowEqual(this._value, vo._value)
  }
}
