import type { AsyncResultλ } from './AsyncResult';
import Result from '@algebraic/types/Result';
import Async from '@algebraic/types/Async';
import { NonEmptyArrayλ } from '../NonEmptyArray/NonEmptyArray';
export { Success as of, Success, Failure };

/**
 * TODO: Add comment
 */
const Success = <A = never, B = never>(p1: B): AsyncResultλ<A, B> =>
  Async.λ.of (Result.λ.of (p1));

/**
 * TODO: Add comment
 */
const Failure = <A = never, B = never>(
  p1: NonEmptyArrayλ<A>
): AsyncResultλ<A, B> => Async.λ.of (Result.λ.Failure (p1));
