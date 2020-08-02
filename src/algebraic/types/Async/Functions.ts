import type { Asyncλ } from './Async';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';

export { bindTo, bindOf };

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A>(
  p1: Exclude<Property, keyof Previous>,
  p2: (a: Previous) => Asyncλ<A>
) => (
  p3: Asyncλ<Previous>
): Asyncλ<
  {
    [K in keyof Previous | Property]: K extends keyof Previous
      ? Previous[K]
      : A;
  }
> =>
  pipe (
    () => p3,
    chain ((a) =>
      pipe (
        () => p2 (a),
        map ((b) => cBindTo (a, p1, b))
      )
    )
  );

/**
 * TODO: Add comment
 */
const bindOf = <Property extends string, Value>(p1: Property) => (
  p2: Asyncλ<Value>
): Asyncλ<{ [K in Property]: Value }> =>
  pipe (
    () => p2,
    map ((a) => cBindTo ({}, p1, a))
  );
