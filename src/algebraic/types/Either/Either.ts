export { Either$λ };
export type { Eitherλ, Rightλ, Leftλ };

const Either$λ = 'Either';
type Either$λ = typeof Either$λ;
type Eitherλ<A, B> = Leftλ<A> | Rightλ<B>;

declare module  '../../../hkt' {
  interface Type2Kind2<A, B> {
    readonly [Either$λ]: Eitherλ<A, B>;
  }
}

/**
 * TODO: Add comment
 */
interface Leftλ<A> {
  λ: {
    id: 'Left';
    kind: Either$λ;
    typeA: A;
    value: A;
  };
}

/**
 * TODO: Add comment
 */
interface Rightλ<B> {
  λ: {
    id: 'Right';
    kind: Either$λ;
    typeB: B;
    value: B;
  };
}


