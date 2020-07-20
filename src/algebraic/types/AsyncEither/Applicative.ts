import type { AsyncEitherλ } from './AsyncEither';
import Either from '@algebraic/types/Either';
import Async from '@algebraic/types/Async';
export { Right as of, Right, Left };

/**
 * TODO: Add comment
 */
const Right = <A = never, B = never>(p1: B): AsyncEitherλ<A, B> =>
  Async.λ.of (Either.λ.of (p1));

/**
 * TODO: Add comment
 */
const Left = <A = never, B = never>(p1: A): AsyncEitherλ<A, B> =>
  Async.λ.of (Either.λ.Left (p1));
