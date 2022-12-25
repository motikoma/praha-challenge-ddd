export type Result<T, E> = Ok<T, E> | Err<T, E>
export type PromiseResult<T, E> = Promise<Result<T, E>>

export class Ok<T, E> {
  constructor(readonly value: T) {}
  isOk(): this is Ok<T, E> {
    return true
  }
  isErr(): this is Err<T, E> {
    return false
  }
}

export class Err<T, E> {
  constructor(readonly error: E) {}
  isOk(): this is Ok<T, E> {
    return false
  }
  isErr(): this is Err<T, E> {
    return true
  }
}

/*
 *　使い方
 */
// const hoge = (x: number): Result<number, Error> => {
//   if (x === 2) {
//     return new Ok(x)
//   }
//   return new Err(new Error('error'))
// }
// const result = hoge(2)
// if (result.isOk()) console.log(result.value)
