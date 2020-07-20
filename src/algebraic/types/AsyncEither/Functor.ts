import type { AsyncEitherλ } from './AsyncEither';
import Either from '@algebraic/types/Either';
import Async from '@algebraic/types/Async';

export { map, mapU };

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const map = <A, B, C>(p1: (b: B) => C) => (
  p2: AsyncEitherλ<A, B>
): AsyncEitherλ<A, C> => mapU (p1, p2);

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const mapU = <A, B, C>(
  p1: (b: B) => C,
  p2: AsyncEitherλ<A, B>
): AsyncEitherλ<A, C> => Async.λU.map (Either.λ.map<A, B, C> (p1), p2);
