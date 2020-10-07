import type { Resultλ } from '@algebraic/types/Result/Result';
import type { Asyncλ } from '@algebraic/types/Async/Async';

export { AsyncResult$λ };
export type { AsyncResultλ };

const AsyncResult$λ = 'AsyncResult';
type AsyncResult$λ = typeof AsyncResult$λ;

declare module '../../../hkt' {
  interface Type2Kind2<A, B> {
    readonly [AsyncResult$λ]: AsyncResultλ<A, B>;
  }
}

type AsyncResultλ<A, B> = Asyncλ<Resultλ<A, B>>;
