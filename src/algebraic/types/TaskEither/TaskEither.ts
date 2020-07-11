import type { Eitherλ } from '@algebraic/types/Either/Either';
import type { Taskλ } from '@algebraic/types/Task/Task';

export { TaskEither$λ };
export type { TaskEitherλ };

const TaskEither$λ = 'TaskEither';
type TaskEither$λ = typeof TaskEither$λ;

declare module  '../../../hkt' {
  interface Type2Kind2<A, B> {
    readonly [TaskEither$λ]: TaskEitherλ<A, B>;
  }
}

type TaskEitherλ<A, B> = Taskλ<Eitherλ<A, B>>;
