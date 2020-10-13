export { NonEmptyArray$λ };
export type { NonEmptyArrayλ };

const NonEmptyArray$λ = 'NonEmptyArray';
type NonEmptyArray$λ = typeof NonEmptyArray$λ;

declare module '../../../hkt' {
  interface Type2Kind1<A> {
    readonly [NonEmptyArray$λ]: NonEmptyArrayλ<A>;
  }
}

/**
 * TODO: Add comment
 */
type NonEmptyArrayλ<A> = [A, ...A[]];
