import type { Eitherλ } from '@algebraic/types/Either/Either';
import type { TaskEitherλ } from './TaskEither';
import Either from '@algebraic/types/Either';
import Task from '@algebraic/types/Task';

export { ap };

const ap = <A, B, C>(p1: TaskEitherλ<A, (a: B) => C>) => (
  p2: TaskEitherλ<A, B>
): TaskEitherλ<A, C> =>
  Task.λ.ap (
    Task.λ.map ((h: Eitherλ<A, (a: B) => C>) => (ga: Eitherλ<A, B>) =>
      Either.λ.ap<A, B, C> (h) (ga)
    ) (p1)
  ) (p2);
