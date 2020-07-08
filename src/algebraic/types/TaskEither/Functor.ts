import type { TaskEitherλ } from './TaskEither';
import Either from '@algebraic/types/Either';
import Task from '@algebraic/types/Task';

export { map, mapU };

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> TaskEither b -> TaskEither c
 */
const map = <A, B, C>(p1: (b: B) => C) => (
  p2: TaskEitherλ<A, B>
): TaskEitherλ<A, C> => mapU (p1, p2);

/**
 * TODO: Add comment
 *
 *  map :: (b -> c) -> TaskEither b -> TaskEither c
 */
const mapU = <A, B, C>(
  p1: (b: B) => C,
  p2: TaskEitherλ<A, B>
): TaskEitherλ<A, C> => Task.λU.map (Either.λ.map<A, B, C> (p1), p2);
