import type { AsyncEitherλ } from './AsyncEither';
import AsyncModule from '../Async';
import EitherModule from '../Either';
import pipe from 'ramda/src/pipe'
import AsyncEitherModule from '.';

export { chain, chainU, flatMap, flatMapU };

/**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const chain = <A, B, C>(p1:  (b: B) => AsyncEitherλ<A, C>) =>
  (p2: AsyncEitherλ<A, B>): AsyncEitherλ<A, C> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> AsyncEither b -> AsyncEither c
 */
const chainU = <A, B, C>(p1: (b: B) => AsyncEitherλ<A, C>, p2: AsyncEitherλ<A, B>): AsyncEitherλ<A, C> =>
  pipe (() => p2, AsyncModule.λ.chain (EitherModule.λ.fold (AsyncEitherModule.λ.Left, p1))) ()


/**
 * TODO: Add comment 
 */
const flatMap = <A, B, C, D>(p1: (b: B) => AsyncEitherλ<A, C>) => (p2: AsyncEitherλ<D, B>): AsyncEitherλ<A | D, C> =>
  
flatMapU (p1, p2)

/**
* TODO: Add comment
*/
const flatMapU = <A, B, C, D>(p1: (b: B) => AsyncEitherλ<A, C>, p2: AsyncEitherλ<D, B>): AsyncEitherλ<A | D, C> =>

AsyncModule.λU.chain (EitherModule.λ.fold <D, B, AsyncEitherλ<D | A, C>> (AsyncEitherModule.λ.Left, p1), p2)