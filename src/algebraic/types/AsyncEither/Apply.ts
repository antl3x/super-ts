import type { Eitherλ } from '@algebraic/types/Either/Either';
import type { AsyncEitherλ } from './AsyncEither';
import Either from '@algebraic/types/Either';
import Async from '@algebraic/types/Async';

export { ap };

const ap = <A, B, C>(p1: AsyncEitherλ<A, (a: B) => C>) => (
  p2: AsyncEitherλ<A, B>
): AsyncEitherλ<A, C> =>
  Async.λ.ap (
    Async.λ.map ((h: Eitherλ<A, (a: B) => C>) => (ga: Eitherλ<A, B>) =>
      Either.λ.ap<A, B, C> (h) (ga)
    ) (p1)
  ) (p2);
