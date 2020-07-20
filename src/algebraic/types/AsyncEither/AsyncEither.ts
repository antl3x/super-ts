import type { Eitherλ } from '@algebraic/types/Either/Either';
import type { Asyncλ } from '@algebraic/types/Async/Async';

export { AsyncEither$λ };
export type { AsyncEitherλ };

const AsyncEither$λ = 'AsyncEither';
type AsyncEither$λ = typeof AsyncEither$λ;

declare module  '../../../hkt' {
  interface Type2Kind2<A, B> {
    readonly [AsyncEither$λ]: AsyncEitherλ<A, B>;
  }
}

type AsyncEitherλ<A, B> = Asyncλ<Eitherλ<A, B>>;
