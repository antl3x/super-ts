import type { TaskEitherλ } from './TaskEither';
import Either from '@algebraic/types/Either';
import Task from '@algebraic/types/Task';
export { Right as of, Right, Left };

/**
 * TODO: Add comment
 */
const Right = <A = never, B = never>(p1: B | Promise<B>): TaskEitherλ<A, B> =>
  Task.λ.of (Either.λ.of (p1 as B));

/**
 * TODO: Add comment
 */
const Left = <A = never, B = never>(p1: A | Promise<A>): TaskEitherλ<A, B> =>
  Task.λ.of (Either.λ.Left (p1 as A));
