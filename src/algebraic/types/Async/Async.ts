export { Async$λ };
export type { Asyncλ };

const Async$λ = 'Async';
type Async$λ = typeof Async$λ;

declare module  '../../../hkt' {
  interface Type2Kind1<A> {
    readonly [Async$λ]: Asyncλ<A>;
  }
}

/**
 * TODO: Add comment
 */
interface Asyncλ<A> {
  (): Promise<A>;
}



