import type { NonEmptyArrayλ } from '../NonEmptyArray/NonEmptyArray';

export { Result$λ };
export type { Resultλ, Successλ, Failureλ };

const Result$λ = 'Result';
type Result$λ = typeof Result$λ;
type Resultλ<A, B> = Failureλ<A> | Successλ<B>;

declare module  '../../../hkt' {
  interface Type2Kind2<A = unknown, B = unknown> {
    readonly [Result$λ]: Resultλ<A, B>;
  }
}

/**
 * TODO: Add comment
 */

interface Failureλ<A> {
  λ: {
    id: 'Failure';
    kind: Result$λ;
    type: A;
    value: NonEmptyArrayλ<A>;
  };
}

/**
 * TODO: Add comment
 */

interface Successλ<B> {
  λ: {
    id: 'Success';
    kind: Result$λ;
    type: B;
    value: B;
  };
}
