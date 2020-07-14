import type { TaskEitherλ } from './TaskEither';
import TaskModule from '../Task';
import EitherModule from '../Either';
import pipe from 'ramda/src/pipe'
import TaskEitherModule from '.';

export { chain, chainU, flatMap, flatMapU };

/**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> TaskEither b -> TaskEither c
 */
const chain = <A, B, C>(p1:  (b: B) => TaskEitherλ<A, C>) =>
  (p2: TaskEitherλ<A, B>): TaskEitherλ<A, C> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> TaskEither b -> TaskEither c
 */
const chainU = <A, B, C>(p1: (b: B) => TaskEitherλ<A, C>, p2: TaskEitherλ<A, B>): TaskEitherλ<A, C> =>
  pipe (() => p2, TaskModule.λ.chain (EitherModule.λ.fold (TaskEitherModule.λ.Left, p1))) ()


/**
 * TODO: Add comment 
 */
const flatMap = <A, B, C, D>(p1: (b: B) => TaskEitherλ<A, C>) => (p2: TaskEitherλ<D, B>): TaskEitherλ<A | D, C> =>
  
flatMapU (p1, p2)

/**
* TODO: Add comment
*/
const flatMapU = <A, B, C, D>(p1: (b: B) => TaskEitherλ<A, C>, p2: TaskEitherλ<D, B>): TaskEitherλ<A | D, C> =>

TaskModule.λU.chain (EitherModule.λ.fold <D, B, TaskEitherλ<D | A, C>> (TaskEitherModule.λ.Left, p1), p2)