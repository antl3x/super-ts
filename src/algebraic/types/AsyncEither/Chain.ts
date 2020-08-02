import type { AsyncEitherλ } from './AsyncEither';
import AsyncModule from '../Async';
import EitherModule from '../Either';
import pipe from 'ramda/src/pipe'
import AsyncEitherModule from '.';

export { chain, chainU, chainStrict, chainStrictU };

/**
 * TODO: Add comment
 * 
 * chainStrict :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const chainStrict = <A, B, C>(p1:  (b: B) => AsyncEitherλ<A, C>) =>
  (p2: AsyncEitherλ<A, B>): AsyncEitherλ<A, C> =>

  chainStrictU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chainStrict :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const chainStrictU = <A, B, C>(p1: (b: B) => AsyncEitherλ<A, C>, p2: AsyncEitherλ<A, B>): AsyncEitherλ<A, C> =>
  pipe (() => p2, AsyncModule.λ.chain (EitherModule.λ.fold (AsyncEitherModule.λ.Left, p1))) ()


/**
 * TODO: Add comment 
 */
const chain = <A, B, C, D>(p1: (b: B) => AsyncEitherλ<A, C>) => (p2: AsyncEitherλ<D, B>): AsyncEitherλ<A | D, C> =>
  
chainU (p1, p2)

/**
* TODO: Add comment
*/
const chainU = <A, B, C, D>(p1: (b: B) => AsyncEitherλ<A, C>, p2: AsyncEitherλ<D, B>): AsyncEitherλ<A | D, C> =>

AsyncModule.λU.chain (EitherModule.λ.fold <D, B, AsyncEitherλ<D | A, C>> (AsyncEitherModule.λ.Left, p1), p2)