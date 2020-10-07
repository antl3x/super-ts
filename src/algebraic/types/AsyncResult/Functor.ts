import type { AsyncResultλ } from './AsyncResult';
import Result from '@algebraic/types/Result';
import Async from '@algebraic/types/Async';

export { map, mapU };

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> AsyncResult b -> AsyncResult c
 */
const map = <A, B, C>(p1: (b: B) => C) => (
  p2: AsyncResultλ<A, B>
): AsyncResultλ<A, C> => mapU (p1, p2);

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> AsyncResult b -> AsyncResult c
 */
const mapU = <A, B, C>(
  p1: (b: B) => C,
  p2: AsyncResultλ<A, B>
): AsyncResultλ<A, C> => Async.λU.map (Result.λ.map<A, B, C> (p1), p2);
