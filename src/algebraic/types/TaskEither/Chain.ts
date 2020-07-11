import type { TaskEitherλ } from './TaskEither';
import { pipe } from '@algebraic/common/pipe';
import TaskModule from '../Task';
import EitherModule from '../Either';
import TaskEitherModule from '.';

export { chain, chainU };

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
  pipe (() => p2, TaskModule.λ.chain (EitherModule.λ.fold (TaskEitherModule.λ.Left, p1)))