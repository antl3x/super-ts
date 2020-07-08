import type { NonEmptyArrayλ } from "../NonEmptyArray/NonEmptyArray";

export { Validation$λ };
export type { Validationλ, Successλ, Failureλ };

const Validation$λ = "Validation";
type Validation$λ = typeof Validation$λ;
type Validationλ<A, B> = Failureλ<A> | Successλ<B>;

declare module "@hkt" {
  interface Type2Kind2<A = unknown, B = unknown> {
    readonly [Validation$λ]: Validationλ<A, B>;
  }
}

/**
 * TODO: Add comment
 */

interface Failureλ<A> {
  λ: {
    id: "Failure";
    kind: Validation$λ;
    type: A;
    value: NonEmptyArrayλ<A>;
  };
}

/**
 * TODO: Add comment
 */

interface Successλ<B> {
  λ: {
    id: "Success";
    kind: Validation$λ;
    type: B;
    value: B;
  };
}
