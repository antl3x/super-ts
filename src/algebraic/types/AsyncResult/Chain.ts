import type { AsyncResultλ } from './AsyncResult';
import AsyncModule from '../Async';
import ResultModule from '../Result';
import pipe from 'ramda/src/pipe';
import AsyncResultModule from '.';

export { chain, chainU, chainStrict, chainStrictU };

/**
 * TODO: Add comment
 *
 * chainStrict :: (b -> c) -> AsyncResult b -> AsyncResult c
 */
const chainStrict = <A, B, C>(p1: (b: B) => AsyncResultλ<A, C>) => (
  p2: AsyncResultλ<A, B>
): AsyncResultλ<A, C> => chainStrictU (p1, p2);

/**
 * TODO: Add comment
 *
 * chainStrict :: (b -> c) -> AsyncResult b -> AsyncResult c
 */
const chainStrictU = <A, B, C>(
  p1: (b: B) => AsyncResultλ<A, C>,
  p2: AsyncResultλ<A, B>
): AsyncResultλ<A, C> =>
  pipe (
    () => p2,
    AsyncModule.λ.chain (ResultModule.λ.fold (AsyncResultModule.λ.Failure, p1))
  ) ();

/**
 * TODO: Add comment
 */
const chain = <A, B, C, D>(p1: (b: B) => AsyncResultλ<A, C>) => (
  p2: AsyncResultλ<D, B>
): AsyncResultλ<A | D, C> => chainU (p1, p2);

/**
 * TODO: Add comment
 */
const chainU = <A, B, C, D>(
  p1: (b: B) => AsyncResultλ<A, C>,
  p2: AsyncResultλ<D, B>
): AsyncResultλ<A | D, C> =>
  AsyncModule.λU.chain (
    ResultModule.λ.fold<D, B, AsyncResultλ<D | A, C>> (
      AsyncResultModule.λ.Failure,
      p1
    ),
    p2
  );
